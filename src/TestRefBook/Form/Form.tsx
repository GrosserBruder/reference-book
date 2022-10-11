import { Button, FormControl, Stack, TextField } from '@mui/material';
import { Field, Form, FormRenderProps, FormProps } from 'react-final-form';

function FormFieldWrapper(Component: any) {
  const componentdWrapped = ({ onChange, input, meta, ...rest }: any) => {
    const customOnChange = (e: any) => {
      if (onChange) {
        onChange?.(e);
      } else {
        input.onChange(e);
      }
    }
    return (
      <FormControl>
        <Component
          {...input}
          {...rest}
          onChange={customOnChange}
        // isInvalid={meta.touched && meta.invalid}
        />
        {meta.touched && (meta.error || meta.submitError)}
      </FormControl>
    )
  }
  return componentdWrapped
}
const TextFieldWrapped = FormFieldWrapper(TextField)

export type TestFormProps = Partial<FormRenderProps> & {
  disabled?: boolean;
  onClose?: () => void;
  isUpdate?: boolean;
  isCreate?: boolean;
}

function TestForm(props: TestFormProps) {
  const { submitting, disabled, handleSubmit, onClose, isCreate, isUpdate } = props;

  return <form onSubmit={handleSubmit} className="create-passcard-form">
    {isCreate && <div>Создание</div>}
    {isUpdate && <div>Редактирование</div>}
    <Stack sx={{ marginTop: 1 }} spacing={1.5}>
      <Field
        label="createdDate"
        name="createdDate"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="name"
        name="name"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="address"
        name="address"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="login"
        name="login"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="password"
        name="password"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="editCount"
        name="editCount"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="description"
        name="description"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="createdDate"
        name="createdDate"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="name"
        name="name"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="address"
        name="address"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="login"
        name="login"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="password"
        name="password"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="editCount"
        name="editCount"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="description"
        name="description"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="createdDate"
        name="createdDate"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="name"
        name="name"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="address"
        name="address"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="login"
        name="login"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="password"
        name="password"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="editCount"
        name="editCount"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />
      <Field
        label="description"
        name="description"
        component={TextFieldWrapped}
        disabled={disabled || submitting}
      />

      <Button type="submit" variant="contained" disabled={disabled || submitting}>Создать</Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={onClose}
        disabled={disabled || submitting}
      >
        Отмена
      </Button>
    </Stack>
  </form >
}

const DefaultDhlTypeRefBookForm = (props: FormProps & TestFormProps) => <Form {...props} render={TestForm} />

export default DefaultDhlTypeRefBookForm;