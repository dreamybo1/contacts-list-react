import { RefObject } from "react";
import { regulars } from "./constants";

type InputNames = "name" | "vacancy" | "phone";

export function validateInputs(
  refs: RefObject<HTMLInputElement | null>[],
  toggleErorr: () => void,
  setError: (val: string) => void
): boolean {
  let error: boolean = false;

  refs.forEach(elem => {
    if (elem.current) {
      let elemName = elem.current.name as InputNames;
      if (!elem.current.value.trim()) {
        setError(`Error: empty fields`);
        toggleErorr();
        elem.current.style.border = "3px solid red";
        elem.current.style.backgroundColor = "red";
        error = true;
        return;
      }

      if (!elem.current.value.match(regulars[elemName])) {
        setError(`Error: wrong field`);
        toggleErorr();
        elem.current.style.border = "3px solid red";
        elem.current.style.backgroundColor = "red";
        error = true;
        return;
      }
    } else {
      error = true;
    }
  });

  return error;
}
