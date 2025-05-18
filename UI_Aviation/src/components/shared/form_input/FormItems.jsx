export function InputArea({
  divClass,
  label,
  labelClass,
  bottomExplain,
  bottomClass,
  inputType,
  inputClass,
  placeHolder,
}) {
  return (
    <div className={`${divClass}`}>
      <label className={`${labelClass}`}>{label}</label>
      <input
        className={`${inputClass}`}
        type={inputType}
        placeholder={`${placeHolder}`}
      />
      <p className={`${bottomClass}`}>{bottomExplain}</p>
    </div>
  );
}
