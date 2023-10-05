/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../ui/button";
import { Form } from "../../../ui/form";
import FirstNameInput from "../first-name-input";
import LastNameInput from "../last-name-input";
import EmailInput from "../email-input";
import type { Profile } from "../../edit-types";
import { api } from "~/utils/api";
import { toast } from "~/components/ui/use-toast";
import SlugInput from "../slug-input";

export const profileFormSchema = z.object({
  firstName: z.string().nonempty("Required"),
  lastName: z.string().nonempty("Required"),
  email: z.string().email(),
  slug: z.string().refine((value) => !/\s/.test(value), {
    message: "Slug must not contain spaces",
  }),
});

export type InferredProfileFormSchema = z.infer<typeof profileFormSchema>;

const ProfileDetailsForm = ({ profile }: { profile: Profile }) => {
  const form = useForm<InferredProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: profile.firstName ?? undefined,
      lastName: profile.lastName ?? undefined,
      email: profile.email,
      slug: profile.slug,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const ctx = api.useContext();

  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      toast({
        variant: "devlinks",
        description: <p>{`Profile successfully updated`}</p>,
      });
    },
    onError: (error) => {
      toast({
        variant: "devlinks",
        title: "Error occured:",
        description: <p>{error.message}</p>,
      });
    },
    onSettled: async () => {
      await ctx.profile.invalidate();
    },
  });

  const onSubmit = (data: InferredProfileFormSchema) => {
    updateProfile.mutate(data);
    form.reset(data);
  };

  return (
    <div className="flex min-h-[calc(100vh-108px)] flex-1 flex-col rounded-xl bg-white p-6 shadow-lg md:min-h-[calc(100vh-152px)] md:p-10 md:pb-6 lg:h-[calc(100vh-152px)] lg:overflow-y-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <h3>Profile Details</h3>
          <p className="mt-2 text-[#737373]">
            Add your details to create a personal touch to your profile.
          </p>

          <div className="my-6 flex-1 space-y-6 md:mb-10">
            <div className="w-full space-y-3 rounded-lg bg-[#FAFAFA] p-5">
              <FirstNameInput control={form.control} />
              <LastNameInput control={form.control} />
              <EmailInput control={form.control} />
              <SlugInput control={form.control} />
            </div>
          </div>

          <hr className="-mx-6 mb-4 border-[#D9D9D9] md:-mx-10 md:mb-6" />

          <div className="md:flex md:justify-end">
            <Button
              variant="dlPrimary"
              className="h-auto w-full py-[11px] md:w-fit md:px-[27px]"
              disabled={!form.formState.isDirty}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsForm;
