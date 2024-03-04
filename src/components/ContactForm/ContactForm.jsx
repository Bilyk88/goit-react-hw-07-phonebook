import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  ErrorMessage,
  FormGroup,
  Field,
  Form,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { addContact } from '../../redux/api';

const contactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  number: Yup.string()
    .min(7, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onAdd = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={contactSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        onAdd(values);
      }}
    >
      <Form action="submit">
        <FormGroup>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" />
        </FormGroup>
        <FormGroup>
          Number
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="span" />
        </FormGroup>
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
