import React, { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Grid, TextField, Checkbox, FormControlLabel, Typography, CircularProgress, useTheme, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { borderRadius, display, height } from "@mui/system";
import { Actions } from "../../hooks/actions";

const CompanyRegisterFlow = () => {
  const theme = useTheme();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [activeStep, setActiveStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [crnNumber, setCrnNumber] = useState("");
  const [incorporationDate, setIncorporationDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyTagline, setCompanyTagline] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyCategories, setCompanyCategories] = useState([]);
  const [branches, setBranches] = useState([{ branchName: "", location: "" }]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const steps = [
    "Basic Information",
    "Company Details",
    "Address Information",
    "Contact Person Information",
    "Additional Information",
  ];

  const isFinalStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (validate()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validate = () => {
    const newErrors = {};
    if (activeStep === 0) {
      if (!companyName) newErrors.companyName = "Company Name is required";
      if (!crnNumber) newErrors.crnNumber = "CRN Number is required";
      if (!incorporationDate) newErrors.incorporationDate = "Incorporation Date is required";
      if (!email) newErrors.email = "Email is required";
      if (!password) newErrors.password = "Password is required";
    }
    if (activeStep === 2) {
      if (!street) newErrors.street = "Street is required";
      if (!city) newErrors.city = "City is required";
      if (!state) newErrors.state = "State is required";
      if (!zip) newErrors.zip = "Zip Code is required";
      if (!country) newErrors.country = "Country is required";
    }
    if (activeStep === 3) {
      if (!contactName) newErrors.contactName = "Contact Name is required";
      if (!phone) newErrors.phone = "Phone number is required";
    }
    if (activeStep === 4) {
      if (!termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
    }
    if (activeStep === 1) {
      if (!companySize) newErrors.companySize = "Company Size is required";
      if (!companyType) newErrors.companyType = "Company Type is required";
      if (!companyCategories.length) newErrors.companyCategories = "At least one category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await Actions.Register({
        companyName,
        crnNumber,
        incorporationDate,
        email,
        password,
        address: { street, city, state, zip, country },
        contactPerson: { name: contactName, phone },
        website,
        linkedin,
        instagram,
        companySize,
        companyLogo,
        companyTagline,
        companyDescription,
        companyType,
        companyCategories,
        branches,
        termsAccepted,
      });

      if (response.data.success) {
        navigate("/confirmation", { replace: true });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const themeStyles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#000" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    },
    paper: {
        minHeight: "90vh",
        backgroundColor: isDarkMode ? "#fff" : "#9e9e9e",
        color: isDarkMode ? "#000" : "#fff",
      },
 
    stepper: {
      backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
      color: isDarkMode ? theme.palette.text.primary : theme.palette.text.secondary,
    },
    textField: {
      marginTop: theme.spacing(2),
      backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.background.default,
      borderRadius:0,
    }
  };

  return (
    <Box sx={themeStyles.container}>
    <Paper elevation={24} sx={{padding:"10px",  maxWidth: 800, margin: "auto" ,...themeStyles.paper}} square >
       
       <Typography gutterBottom variant="h4" >Join  AMILE </Typography>

      <Stepper activeStep={activeStep} sx={themeStyles.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <BasicInfoStep
            companyName={companyName}
            setCompanyName={setCompanyName}
            crnNumber={crnNumber}
            setCrnNumber={setCrnNumber}
            incorporationDate={incorporationDate}
            setIncorporationDate={setIncorporationDate}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errors={errors}
            themeStyles={themeStyles}
          />
        )}
        {activeStep === 2 && (
          <AddressStep
            street={street}
            setStreet={setStreet}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zip={zip}
            setZip={setZip}
            country={country}
            setCountry={setCountry}
            errors={errors}
            themeStyles={themeStyles}
          />
        )}
        {activeStep === 3 && (
          <ContactPersonStep
            contactName={contactName}
            setContactName={setContactName}
            phone={phone}
            setPhone={setPhone}
            errors={errors}
            themeStyles={themeStyles}
          />
        )}
        {activeStep === 4 && (
          <AdditionalInfoStep
            website={website}
            setWebsite={setWebsite}
            linkedin={linkedin}
            setLinkedin={setLinkedin}
            instagram={instagram}
            setInstagram={setInstagram}
            error={errors.termsAccepted}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            themeStyles={themeStyles}
          />
        )}
        {activeStep === 1 && (
          <CompanyDetailsStep
            companySize={companySize}
            setCompanySize={setCompanySize}
            companyLogo={companyLogo}
            setCompanyLogo={setCompanyLogo}
            companyTagline={companyTagline}
            setCompanyTagline={setCompanyTagline}
            companyDescription={companyDescription}
            setCompanyDescription={setCompanyDescription}
            companyType={companyType}
            setCompanyType={setCompanyType}
            companyCategories={companyCategories}
            setCompanyCategories={setCompanyCategories}
            branches={branches}
            setBranches={setBranches}
            errors={errors}
            themeStyles={themeStyles}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handleBack} disabled={activeStep === 0} variant="contained" >
            Back
          </Button>
          <Button
            onClick={isFinalStep ? handleSubmit : handleNext}
           variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : isFinalStep ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
      </Paper>
    </Box>
  );
};

const BasicInfoStep = ({ companyName, setCompanyName, crnNumber, setCrnNumber, incorporationDate, setIncorporationDate, email, setEmail, password, setPassword, errors, themeStyles }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        error={!!errors.companyName}
        helperText={errors.companyName}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="CRN Number"
        value={crnNumber}
        onChange={(e) => setCrnNumber(e.target.value)}
        error={!!errors.crnNumber}
        helperText={errors.crnNumber}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Incorporation Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={incorporationDate}
        onChange={(e) => setIncorporationDate(e.target.value)}
        error={!!errors.incorporationDate}
        helperText={errors.incorporationDate}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        sx={themeStyles.textField}
      />
    </Grid>
  </Grid>
);

const AddressStep = ({ street, setStreet, city, setCity, state, setState, zip, setZip, country, setCountry, errors, themeStyles }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        error={!!errors.street}
        helperText={errors.street}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={!!errors.city}
        helperText={errors.city}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        error={!!errors.state}
        helperText={errors.state}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Zip Code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        error={!!errors.zip}
        helperText={errors.zip}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        error={!!errors.country}
        helperText={errors.country}
        sx={themeStyles.textField}
      />
    </Grid>
  </Grid>
);

const ContactPersonStep = ({ contactName, setContactName, phone, setPhone, errors, themeStyles }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Contact Person Name"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        error={!!errors.contactName}
        helperText={errors.contactName}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
        sx={themeStyles.textField}
      />
    </Grid>
  </Grid>
);

const AdditionalInfoStep = ({ website, setWebsite, linkedin, setLinkedin, instagram, setInstagram, error, termsAccepted, setTermsAccepted, themeStyles }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="LinkedIn"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Instagram"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
        }
        label="I accept the terms and conditions"
      />
      {error && <Typography color="error">{error}</Typography>}
    </Grid>
  </Grid>
);

const CompanyDetailsStep = ({ companySize, setCompanySize, companyLogo, setCompanyLogo, companyTagline, setCompanyTagline, companyDescription, setCompanyDescription, companyType, setCompanyType, companyCategories, setCompanyCategories, errors, themeStyles }) => (
  <Grid container spacing={2}>
     <Grid item xs={12}>
      <TextField
        label="Company Size"
        fullWidth
        value={companySize}
        onChange={(e) => setCompanySize(e.target.value)}
        select
        SelectProps={{ native: true }}
        error={!!errors.companySize}
        helperText={errors.companySize}
      >
        <option value="">Select Size</option>
        <option value="1-10">1-10</option>
        <option value="10-100">10-100</option>
        <option value="100-500">100-500</option>
        <option value="500-5000">500-5000</option>
        <option value="above 5000">Above 5000</option>
      </TextField>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Company Logo"
        value={companyLogo}
        onChange={(e) => setCompanyLogo(e.target.value)}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Company Tagline"
        value={companyTagline}
        onChange={(e) => setCompanyTagline(e.target.value)}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Company Description"
        value={companyDescription}
        onChange={(e) => setCompanyDescription(e.target.value)}
        sx={themeStyles.textField}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Company Type"
        fullWidth
        value={companyType}
        onChange={(e) => setCompanyType(e.target.value)}
        select
        SelectProps={{ native: true }}
        error={!!errors.companyType}
        helperText={errors.companyType}
      >
        <option value="">Select Type</option>
        <option value="startup">Startup</option>
        <option value="service-based">Service-based</option>
        <option value="product-based">Product-based</option>
      </TextField>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Company Categories"
        value={companyCategories.join(", ")}
        onChange={(e) => setCompanyCategories(e.target.value.split(", "))}
        error={!!errors.companyCategories}
        helperText={errors.companyCategories}
        sx={themeStyles.textField}
      />
    </Grid>

  </Grid>
);

export default CompanyRegisterFlow;
