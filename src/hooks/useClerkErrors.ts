import type { ClerkAPIError } from "@clerk/types";
import { useEffect, useState } from "react";

export const useClerkErrors = (errors: ClerkAPIError[] | undefined) => {
  const [emailErrors, setEmailErrors] = useState<ClerkAPIError[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<ClerkAPIError[]>([]);

  useEffect(() => {
    if (errors) {
      const emailErrs: ClerkAPIError[] = [];
      const passwordErrs: ClerkAPIError[] = [];

      errors.forEach((error) => {
        if (
          error.meta?.paramName === "email_address" ||
          error.meta?.paramName === "identifier"
        ) {
          emailErrs.push(error);
        } else if (error.meta?.paramName === "password") {
          passwordErrs.push(error);
        }
      });

      setEmailErrors(emailErrs);
      setPasswordErrors(passwordErrs);
    }
  }, [errors]);

  return {
    emailErrors,
    setEmailErrors,
    passwordErrors,
    setPasswordErrors,
  };
};
