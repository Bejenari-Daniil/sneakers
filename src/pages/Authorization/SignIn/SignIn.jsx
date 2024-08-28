import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LOCALSTORAGE_KEYS } from '../../../helper/constants';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './SignIn.module.scss';
import ButtonGoBack from '../../../components/Elements/ButtonGoBack/ButtonGoBack';

const SignIn = () => {
  const navigate = useNavigate();
  const { login, logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values, { setFieldError }) => {
    const registeredUsers = localStorage.getItem(
      LOCALSTORAGE_KEYS.SAVE_USER_TO_STORE,
    );

    const userList = registeredUsers ? JSON.parse(registeredUsers) : [];

    const user = userList.find(
      (user) =>
        user.email === values.email && user.password === values.password,
    );

    if (user) {
      console.log('Found user:', user);
      login(user);
      navigate('/');
    } else {
      setFieldError('email', 'Пользователь с такими данными не найден');
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className={styles.SignIn}>
            <Form>
              {currentUser ? (
                <button type="button" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <>
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

                  <button type="submit" disabled={!formik.isValid}>
                    Log In
                  </button>
                </>
              )}

              <button type="button" onClick={() => navigate('/signUp')}>
                Create new account
              </button>
              <ButtonGoBack />
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
