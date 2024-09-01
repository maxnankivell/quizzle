import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type SignUpInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUp() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const onSubmit: SubmitHandler<SignUpInputs> = (data) => console.log(data);

  return (
    <Box
      sx={{
        width: {
          xs: 250,
          sm: 280,
          md: 360,
          lg: 480,
          xl: 500,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <img src="/quizzle-logo.svg" alt="logo" style={{ maxWidth: "200px" }} />

      <Typography variant="h3" textAlign="center">
        Sign Up
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", alignContent: "center" }}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          {...register("email", { required: true, pattern: /^.+@.+$/ })}
          sx={{ marginTop: "24px" }}
        />
        {errors.email && (
          <Typography variant="subtitle2" sx={{ marginTop: "4px", color: theme.palette.error.main }}>
            {errors.email.type === "required"
              ? "Email is required"
              : errors.email.type === "pattern"
                ? "Invalid email adress"
                : "Validation error"}
          </Typography>
        )}

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          {...register("password", {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/,
          })}
          sx={{ marginTop: "24px" }}
        />
        {errors.password && (
          <Typography variant="subtitle2" sx={{ marginTop: "4px", color: theme.palette.error.main }}>
            {errors.password.type === "required"
              ? "Password is required"
              : errors.password.type === "pattern"
                ? "Password must contain a number, an uppercase letter and a lowercase letter"
                : "Validation error"}
          </Typography>
        )}

        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          required
          {...register("passwordConfirm", {
            required: true,
            validate: (value, formValues) => value === formValues.password,
          })}
          sx={{ marginTop: "24px" }}
        />
        {errors.passwordConfirm && (
          <Typography variant="subtitle2" sx={{ marginTop: "4px", color: theme.palette.error.main }}>
            {errors.passwordConfirm.type === "required"
              ? "Confirm password is required"
              : errors.passwordConfirm.type === "validate"
                ? "Does not match password"
                : "Validation error"}
          </Typography>
        )}

        <Button type="submit" variant="contained" sx={{ marginTop: "24px" }}>
          Submit
        </Button>
      </form>

      <Button variant="text">Log In</Button>
    </Box>
  );
}

export default SignUp;
