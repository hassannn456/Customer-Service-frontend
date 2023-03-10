import { Button, Stack, useTheme } from "@mui/material";
import {
  StyledInput,
  StyledInputLabel,
  StyledMenuItem,
  StyledSelect,
} from "../helpers/inputs";
import { useState } from "react";
import IonicSvg from "../helpers/IonicSvg";
import { useSignUpMutation } from "../../generated/graphql.tsx";
import { onSubmitHandler } from "../helpers/submitHandlers";
import errorHandler from "../helpers/errorHandler";

const SignUp = () => {
  const theme = useTheme();
  const [role, setRole] = useState("");
  const [created, setCreated] = useState("");

  const [submitSignUp, { loading, error }] = useSignUpMutation();

  const [form, setForm] = useState({
    username: null,
    password: null,
    name: "",
    roles: "",
  });

  const submitHandler = async (e, submitSignUp, form) => {
    const result = await onSubmitHandler(e, submitSignUp, form);
    result.signUp?.username && setCreated("- User Created Successfully!")
  };

  const onChangeHandler =
    (name) =>
    ({ target }) =>
      setForm({ ...form, [name]: target.value });

  return (
    <>
      <IonicSvg />

      <form onSubmit={(e) => submitHandler(e, submitSignUp, form)}>
        <Stack
          pt={2}
          justifyContent="center"
          spacing={2.4}
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <Stack mt={1}>
            <StyledInputLabel htmlFor="name">Name:</StyledInputLabel>
            <StyledInput
              element="input"
              id="name"
              type="text"
              onChange={onChangeHandler("name")}
            />
          </Stack>

          <Stack>
            <StyledInputLabel htmlFor="username">Username:</StyledInputLabel>
            <StyledInput
              element="input"
              id="username"
              type="username"
              onChange={onChangeHandler("username")}
            />
          </Stack>

          <Stack>
            <StyledInputLabel htmlFor="password">Password:</StyledInputLabel>
            <StyledInput
              element="input"
              id="password"
              type="password"
              onChange={onChangeHandler("password")}
            />
          </Stack>

          <Stack spacing={1.4}>
            <StyledInputLabel htmlFor="roles">Role:</StyledInputLabel>
            <StyledSelect
              labelId="role-label"
              id="roles"
              value={role}
              variant="standard"
              onChange={(event) => {
                setRole(event.target.value);
                setForm({ ...form, roles: event.target.value });
              }}
              size="small"
              // MenuProps={{
              //   PaperProps:{
              //     sx: {
              //       position:'fixed'
              //     }
              //   },
              // }}
            >
              {["Admin", "Customer Service", "Operations"].map((name) => (
                <StyledMenuItem key={name} value={name}>
                  {name}
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </Stack>
        </Stack>

        {error && errorHandler(error)}

        {created ? <Stack m={2}> <small>{created}</small> </Stack> : null}

        <Stack mt={2} width="100%" alignItems="center">
          <Button
            sx={{ width: "98%", background: "#428cff", color: "white" }}
            variant="contained"
            disabled={loading}
            type="submit"
          >
            {loading ? "..." : "Create Account"}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SignUp;
