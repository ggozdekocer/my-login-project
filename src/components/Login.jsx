import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const initialErrors = {
  email: '',
  password: '',
  terms: '',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const isEmailValid = emailRegex.test(form.email);
    const isPasswordValid = passwordRegex.test(form.password);
    const isTermsAccepted = form.terms === true;

    setIsValid(isEmailValid && isPasswordValid && isTermsAccepted);
  }, [form]);

  const validate = (name, value) => {
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? '' : 'Geçerli bir email adresi giriniz.';
    }
    if (name === 'password') {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return passwordRegex.test(value) ? '' : 'Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.';
    }
    if (name === 'terms') {
      return value ? '' : 'Şartları kabul etmelisiniz.';
    }
    return '';
  };

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;
    const error = validate(name, val);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password === form.password && item.email === form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/main');
        } else {
          history.push('/error');
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.email}
          invalid={errors.email !== ''}
        />
        <FormFeedback>{errors.email}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={form.password}
          invalid={errors.password !== ''}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup check>
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          checked={form.terms}
          onChange={handleChange}
          onBlur={handleBlur}
          invalid={errors.terms !== ''}
        />
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        <FormFeedback>{errors.terms}</FormFeedback>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}