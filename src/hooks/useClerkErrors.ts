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
    emailError: emailErrors[0]
      ? getErrorMessage(emailErrors[0].code, errorConditions)
      : undefined,
    setEmailErrors,
    passwordError: passwordErrors[0]
      ? getErrorMessage(passwordErrors[0].code, errorConditions)
      : undefined,
    setPasswordErrors,
  };
};

type ErrorMap<T extends string> = { [K in T]: string };

const errorConditions: ErrorMap<string> = {
  form_identifier_not_found: "Can't find account",
  form_password_incorrect: "Incorrect password",
  form_identifier_exists: "Email already used",
  form_password_pwned: "Weak password",
  form_password_length_too_short: "Must be 8 characters min",
};

function getErrorMessage<T extends string>(error: T, errorMap: ErrorMap<T>) {
  return errorMap[error] ?? "Unknown error";
}
