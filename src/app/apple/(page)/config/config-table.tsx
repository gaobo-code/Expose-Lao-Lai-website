'use client';

import { Config } from '@/db/schema';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = {
  configs: Config[];
  setConfigs: React.Dispatch<React.SetStateAction<Config[]>>
};

function validateValue(value: string) {
  return (
    typeof value === "string" &&
    value.trim().length >= 1 &&
    value.trim().length <= 20
  );
}

export function ConfigTable({ configs, setConfigs }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {

    const trimmedValue = e.target.value.trim();
    if (!validateValue(trimmedValue)) return;

    setConfigs((prev: Config[]) =>
      prev.map((item: Config) =>
        item.id === id
          ? { ...item, value: trimmedValue }
          : item
      )
    );
  };

  return (
    <div className="w-full px-4 py-10 box-border">
      <FieldGroup className="grid grid-cols-2 gap-10">
        {configs.map((item) => (
          <Field orientation="horizontal" key={item.id}>
            <FieldLabel className="mr-5">{item.attr}</FieldLabel>
            <Input
              type="text"
              required
              minLength={1}
              maxLength={20}
              defaultValue={item.value}
              onBlur={(e) => handleChange(e, item.id)}
            />
          </Field>
        ))}
      </FieldGroup>
    </div>
  );
}
