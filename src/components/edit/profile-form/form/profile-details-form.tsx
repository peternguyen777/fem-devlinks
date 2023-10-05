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
  slug: z
    .string()
    .nonempty("Required")
    .refine((value) => !/\s/.test(value), {
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
    <div className="flex min-h-[calc(100vh-108px)] flex-1 flex-col rounded-xl bg-white p-6 shadow-lg md:min-h-[calc(100vh-152px)] md:p-10 md:pb-6 xl:h-[calc(100vh-152px)] xl:overflow-y-auto">
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
            <div className="w-full rounded-lg bg-[#FAFAFA] p-5">
              <p className="text-[#737373]">Profile picture</p>
              <div className="mt-4 flex h-[193px] w-[193px] cursor-pointer flex-col items-center justify-center rounded-xl bg-[#EFEBFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="none"
                  viewBox="0 0 40 40"
                >
                  <path
                    fill="#633CFF"
                    d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
                  />
                </svg>
                <p className="mt-2 font-semibold text-[#633CFF]">
                  + Upload Image
                </p>
              </div>

              <h6 className="mt-6 text-[#737373]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </h6>
            </div>
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
