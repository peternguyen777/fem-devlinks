import type { ClerkAPIError } from "@clerk/types";
import { useEffect, useState } from "react";

export const useClerkErrors = (errors: ClerkAPIError[] | undefined) => {
  const [emailErrors, setEmailErrors] = useState<ClerkAPIError[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<ClerkAPIError[]>([]);
  const [codeErrors, setCodeErrors] = useState<ClerkAPIError[]>([]);

  useEffect(() => {
    if (errors) {
      const emailErrs: ClerkAPIError[] = [];
      const passwordErrs: ClerkAPIError[] = [];
      const codeErrs: ClerkAPIError[] = [];

      errors.forEach((error) => {
        if (
          error.meta?.paramName === "email_address" ||
          error.meta?.paramName === "identifier"
        ) {
          emailErrs.push(error);
        } else if (error.meta?.paramName === "password") {
          passwordErrs.push(error);
        } else if (error.meta?.paramName === "code") {
          codeErrs.push(error);
        }
      });

      setEmailErrors(emailErrs);
      setPasswordErrors(passwordErrs);
      setCodeErrors(codeErrs);
    }
  }, [errors]);

  return {
    emailError: emailErrors[0]
      ? getErrorMessage(emailErrors[0].code, errorConditions, "Email error")
      : undefined,
    setEmailErrors,
    passwordError: passwordErrors[0]
      ? getErrorMessage(
          passwordErrors[0].code,
          errorConditions,
          "Password error",
        )
      : undefined,
    setPasswordErrors,
    codeError: codeErrors[0]
      ? getErrorMessage(codeErrors[0].code, errorConditions, "Code error")
      : undefined,
    setCodeErrors,
  };
};

type ErrorMap<T extends string> = { [K in T]: string };

const errorConditions: ErrorMap<string> = {
  form_identifier_not_found: "Can't find account",
  form_password_incorrect: "Incorrect password",
  form_identifier_exists: "Email in use",
  form_password_pwned: "Weak password",
  form_password_length_too_short: "Must be 8 characters min",
  form_code_incorrect: "Incorrect code",
  form_param_nil: "Enter code",
};

function getErrorMessage<T extends string>(
  error: T,
  errorMap: ErrorMap<T>,
  defaultErrorMessage: string,
) {
  return errorMap[error] ?? defaultErrorMessage;
}
