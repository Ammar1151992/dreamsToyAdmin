import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useStore } from "../store";


const CustomButton = ({ type, name, color, startIcon}) => {
  const { setIsOpen, setLoading } = useStore();

  const handleModel = () => {
    setIsOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="btn">
      <div className="btn-btn">
        <Stack spacing={2} direction="row">
          <Button size="small" variant="outlined" onClick={handleModel} color={color} startIcon={startIcon}>
            {type} {name}
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default CustomButton;
