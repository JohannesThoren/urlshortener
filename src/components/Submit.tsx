export default function Submit(props: { value: string }) {
	return (
		<input
			className="w-full bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-300 py-1 px-2 rounded-md dark:hover:bg-stone-600 hover:bg-stone-400 hover:cursor-pointer"
			type="submit"
			value={props.value}
		/>
	);
}