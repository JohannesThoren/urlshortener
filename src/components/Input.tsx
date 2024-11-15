import { HTMLInputTypeAttribute } from "react";

interface IInput {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name?: string;
  value?: any;
  required?: boolean;
}

export default function Input(props: IInput) {
  return (
    <input
      className="w-full bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-300 py-1 px-2 rounded-md"
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      required={props.required}
    />
  );
}