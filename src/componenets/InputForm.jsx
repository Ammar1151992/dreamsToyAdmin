import { Formik, Form, Field } from "formik";
import { object, string, date, boolean, mixed, number } from "yup";
import { useStore } from "../store";
import { useEffect, useRef, useState } from "react";
import CustomInput from "./CustomInput";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const FormFields = () => {
  const { products, list, setIsOpen } = useStore();
  const [initialValue, setInitialValue] = useState({});
  useEffect(() => {
    if (products.length > 0) {
      const initialData = {};
      Object.keys(products[0]).map((key) => {
        if (key !== "id" && key !== "createAt") {
          initialData[key] = "";
        }
      });
      setInitialValue(initialData);
    }
  }, [products]);

  const fileRef = useRef(null);
  return (
    <>
      <div>
        <Formik
          initialValues={initialValue}
          validationSchema={object().shape(
            Object.fromEntries(
              Object.keys(initialValue).map((key) => [
                key,
                key === "image"
                  ? mixed()
                      .test(
                        "fileType",
                        "Only image files are allowed",
                        (value) => {
                          if (!value) return true; // No file selected is also valid
                          if (typeof value !== "object" || !value.type)
                            return false; // Value is not a file or doesn't have a type
                          const isValid = value.type.startsWith("image/");
                          return isValid;
                        }
                      )
                      .nullable()
                  : key === "price"
                  ? number().required(`${key} is required`)
                  : string().required(`${key} is required`),
              ])
            )
          )}
          onSubmit={(values) => {
            console.log("This is values", values);
            return new Promise((res) => setTimeout(res, 2500));
          }}
        >
          {({ values, isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              <div className="lable">
                <fieldset className="redus">
                  <legend className="spaced-legend">Add {list}</legend>
                  {Object.keys(initialValue).map((key) => (
                    <div key={key}>
                      {key === "image" ? (
                        <>
                          <input
                            ref={fileRef}
                            hidden
                            id={key}
                            name={key}
                            type="file"
                            label={key}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setFieldValue(key, file);
                            }}
                          />
                          <button
                            className="image-upload"
                            onClick={() => {
                              fileRef.current.click();
                            }}
                          >
                            Upload Image
                          </button>
                        </>
                      ) : (
                        <Field
                          id={key}
                          name={key}
                          label={key}
                          values={values}
                          as={CustomInput}
                          error={errors[key] && touched[key]}
                        />
                      )}

                      {errors[key] && touched[key] && (
                        <div style={{ color: "red" }}>{errors[key]}</div>
                      )}
                    </div>
                  ))}
                  {/* <pre>{JSON.stringify({ values }, null, 4)}</pre> */}
                  <Stack
                    spacing={0.5}
                    direction="row"
                    className="father-btn-add"
                  >
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="success"
                      className="button-add"
                      type="submit"
                    >
                      {isSubmitting ? "Adding" : "Add"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      className="button-add"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </fieldset>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormFields;
