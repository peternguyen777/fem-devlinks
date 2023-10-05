/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import { Button } from "../../../ui/button";
import { Form } from "../../../ui/form";
import { toast } from "../../../ui/use-toast";
import type { LinkState } from "../../edit-types";
import IllustrationEmpty from "../illustration-empty";
import PlatformSelector from "../platform-selector";
import UrlInput from "../url-input";

export const formSchema = z.object({
  links: z
    .object({
      linkId: z.string().optional(),
      linkName: z.string().nonempty("Invalid platform"),
      url: z.string().url(),
      priority: z.number(),
    })
    .array(),
});

export type InferredFormSchema = z.infer<typeof formSchema>;

const CustomizeLinksForm = ({
  links,
  isLoading,
}: {
  links: LinkState[];
  isLoading: boolean;
}) => {
  const form = useForm<InferredFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { fields, remove, append } = useFieldArray<InferredFormSchema>({
    control: form.control,
    name: "links",
  });

  const [deleteLinks, setDeleteLinks] = useState<string[]>([]);

  useEffect(() => form.reset({ links }), [form, links]);

  const hasLinks = fields.length > 0;

  const ctx = api.useContext();

  const updateLinks = api.links.updateLinks.useMutation({
    onSuccess: () => {
      setDeleteLinks([]);
      toast({
        variant: "devlinks",
        description: <p>{`Links successfully updated`}</p>,
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

  const onSubmit = (values: InferredFormSchema) => {
    updateLinks.mutate({ ...values, deleteLinks });
  };

  return (
    <div className="flex min-h-[calc(100vh-108px)] flex-1 flex-col rounded-xl bg-white p-6 shadow-lg md:min-h-[calc(100vh-152px)] md:p-10 md:pb-6 lg:h-[calc(100vh-152px)] lg:overflow-y-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <h3>Customize your links</h3>
          <p className="mt-2 text-[#737373]">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button
            variant="dlSecondary"
            className="mt-10 h-auto w-full px-[27px] py-[11px]"
            type="button"
            onClick={() => {
              append({
                linkName: "",
                url: "",
                priority: fields.length + 1,
              });
            }}
            disabled={fields.length === 5}
          >
            + Add new link
          </Button>

          {!hasLinks && !isLoading && <EmptyLinks />}
          {hasLinks && (
            <div className="my-6 flex flex-1 flex-col items-center space-y-6 md:mb-10">
              {fields.map((link, index) => (
                <div
                  key={link.id}
                  className="w-full space-y-3 rounded-lg bg-[#FAFAFA] p-5"
                >
                  <div className="flex justify-between">
                    <div className="flex cursor-pointer items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="6"
                        fill="none"
                        viewBox="0 0 12 6"
                      >
                        <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z" />
                      </svg>
                      <h5 className="select-none font-bold text-[#737373]">{`Link #${link.priority}`}</h5>
                    </div>
                    <h5
                      className="cursor-pointer text-[#737373]"
                      onClick={() => {
                        if (link.linkId) {
                          setDeleteLinks([...deleteLinks, link.linkId]);
                        }
                        remove(index);
                      }}
                    >
                      Remove
                    </h5>
                  </div>
                  <PlatformSelector control={form.control} index={index} />
                  <UrlInput control={form.control} index={index} />
                </div>
              ))}
            </div>
          )}

          <hr className="-mx-6 mb-4 border-[#D9D9D9] md:-mx-10 md:mb-6" />

          <div className="md:flex md:justify-end">
            <Button
              variant="dlPrimary"
              className="h-auto w-full py-[11px] md:w-fit md:px-[27px]"
              disabled={
                (links.length === 0 && fields.length === 0) ||
                !form.formState.isDirty
              }
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

const EmptyLinks = () => (
  <div className="my-6 flex flex-1 flex-col items-center justify-center rounded-xl bg-[#FAFAFA] p-5 md:mb-10">
    <div className="flex flex-col items-center space-y-6 py-[26.5px] md:px-[56.5px] md:py-[62.5px] lg:px-[100px] lg:py-[42.5px]">
      <IllustrationEmpty />
      <h3 className="text-center">Let&apos;s get you started</h3>
      <p className="text-center text-[#737373]">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We&apos;re here to help you
        share your profiles with everyone!
      </p>
    </div>
  </div>
);

export default CustomizeLinksForm;
