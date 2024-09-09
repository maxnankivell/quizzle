import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type LogInInputs = {
  email: string;
  password: string;
};

function LogIn() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInputs>();
  const onSubmit: SubmitHandler<LogInInputs> = (data) => console.log(data);

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
        Log In
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", alignContent: "center", width: "100%" }}
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
          })}
          sx={{ marginTop: "24px" }}
        />
        {errors.password && (
          <Typography variant="subtitle2" sx={{ marginTop: "4px", color: theme.palette.error.main }}>
            {errors.password.type === "required" ? "Password is required" : "Validation error"}
          </Typography>
        )}

        <Button type="submit" variant="contained" sx={{ marginTop: "24px" }}>
          Submit
        </Button>
      </form>

      <Link to={"/signup"}>
        <Button variant="text">Sign Up</Button>
      </Link>
    </Box>
  );
}

export default LogIn;
