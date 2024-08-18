interface IFormInput {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
}: IFormInput) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        className="main_input"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium pl-5">
          {error}
        </span>
      ))}
    </div>
  );
}
