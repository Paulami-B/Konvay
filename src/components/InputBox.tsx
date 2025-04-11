type InputBoxProps = {
    type: 'text' | 'email',
    name: string,
    label: string,
    required?: boolean,
    value?: string,
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function InputBox({type, name, label, required, value, handleChange}: InputBoxProps) {
    return (
        <div className="relative py-2">
            <input name={name} type={type} required={required ? required : true} value={value}
            className="block pb-1 px-2 pt-2 w-full bg-transparent rounded-lg border-1 border-gray-400 appearance-none 
            focus:outline-none focus:ring-0 focus:border-orange-500 peer text-sm dark:text-gray-200" placeholder=" "
            onChange={handleChange} />
            <label className="absolute text-gray-500 text-sm duration-300 transform -translate-y-4 scale-75 dark:text-gray-200 bg-white dark:bg-gray-800 
            top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-orange-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
            peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {label}
            </label>
        </div>
    )
}