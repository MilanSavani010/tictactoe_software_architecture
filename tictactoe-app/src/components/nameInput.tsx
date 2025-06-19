import { useState } from 'react';

interface NameInputProps {
  onSubmit: (name: string) => void;
  defaultValue?: string;
}
export function NameInput({ onSubmit, defaultValue }: NameInputProps) {
  const [value, setValue] = useState(defaultValue || '');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
      style={{ marginBottom: 16 }}
    >
      <input
        type="text"
        placeholder="Enter your name"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
      <button type="submit">OK</button>
    </form>
  );
}