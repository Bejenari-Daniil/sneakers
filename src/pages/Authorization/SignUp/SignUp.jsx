import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCALSTORAGE_KEYS } from '../../../helper/constants';
import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const [userRegistration, setUserRegistration] = useState([]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    modoOfContact: '',
    phone: '',
  };

  const registerUser = (values) => {
    const updatedUsersList = [...userRegistration, values];
    console.log('Values saved in localStorage:', updatedUsersList);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.SAVE_USER_TO_STORE,
      JSON.stringify(updatedUsersList),
    );
    setUserRegistration(updatedUsersList);
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log('Registration Form', values);
    registerUser(values);
    navigate('/signIn');
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Password must match')
      .required('Required'),
    phone: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Phone number is not valid')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className={styles.registrationForm_overlay}>
            <div className={styles.registrationForm}>
              <div className={styles.form__header}>
                <p>Sign UP</p>
                <span>It's quick and easy</span>
                <button type="button" onClick={() => navigate('/signIn')}>
                  <IoCloseCircleOutline />
                </button>
              </div>

              <Form>
                <div className={styles.form_control}>
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.form_control}>
                  <label htmlFor="email">E-mail</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.form_control}>
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.form_control}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.form_control}>
                  <label htmlFor="phone">Phone</label>
                  <Field type="text" id="phone" name="phone" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <button type="submit" disabled={!formik.isValid}>
                  Sign UP
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUp;
