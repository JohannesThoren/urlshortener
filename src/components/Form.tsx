export default function Form({
    children,
    action,
  }: {
    children: React.ReactNode;
    action: (formData: FormData) => void | Promise<void>;
  }) {
    return (
      <form
        action={action}
        className="bg-stone-200 dark:bg-stone-800 [&>*]:m-2 py-1 px-2 rounded-md w-full"
      >
        {children}
      </form>
    );
  }