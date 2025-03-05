interface formFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeHolder: string
}

function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeHolder,
}: formFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[16px] font-medium text-default-text-color mb-1 font-inter"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeHolder}
        onChange={onChange}
        className={`w-full h-[50px] px-4 py-2 shadow-custom-card border border-primary-border-color focus:border-[1px] ${value.length > 0 ? 'text-primary-text-color' : 'placeholder-secondary-text-color'} rounded-[15px] ${
          error ? 'border-red-500' : 'border-primary-border-color '
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
export default FormField
