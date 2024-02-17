import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useStore } from "../store";
import "./componenet.css";
import FormFields from "./InputForm";
import { Modal } from "../Modal/modal";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function TableData() {
  const {
    products,
    setProducts,
    list,
    isOpen,
    loading,
    setLoading,
    selection,
    setSelection,
  } = useStore();
  const selectApi = list;

  const handleSelected = (selection) => {
    setSelection(selection);
  };

  const token = localStorage.getItem("adminToken");
  const headers = new Headers({
    "Content-Type": "application/json",
    token: token,
  });
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `https://aon-final.onrender.com/${selectApi}/view`,
        requestOptions
      );

      const data = await resp.json();
      if (!data.success) {
        setProducts([]);
        return;
      }

      if (data) {
        setProducts(data[selectApi]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectApi]);

  return (
    <>
      <Loading />
      <div className={loading ? "disable" : ""}>
        <div className="buttonFlex">
          {selection.length > 0 && (
            <>
              <CustomButton
                type="Delete"
                name={selectApi}
                color="error"
                startIcon={<DeleteIcon />}
              />
              <CustomButton
                type="Edit"
                name={selectApi}
                color="secondary"
                startIcon={<EditIcon />}
              />
            </>
          )}
          {selectApi !== "wishlist" &&
           selectApi !== "order" &&
           selectApi !== "cart" && (
            <CustomButton type="Add" name={selectApi} startIcon={<AddIcon />} />
          )}
        </div>
      </div>

      <div
        style={{ height: 670, width: "100%" }}
        className={loading ? "disable" : ""}
      >
        <DataGrid
          rows={
            products.length > 0
              ? products.map((product) => ({
                  ...product,
                  image: (
                    <img
                      src={product.image}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ),
                }))
              : ""
          }
          columns={
            products.length > 0
              ? Object.keys(products[0]).map((key) => ({
                  field: key,
                  headerName: key,
                  align: "center",
                  width: key === "image" ? 150 : 110,
                  renderCell: (params) =>
                    key === "image" ? (
                      <div style={{ width: "100px", height: "100px" }}>
                        {params.value}
                      </div>
                    ) : params.value != null ? (
                      params.value.toString()
                    ) : (
                      ""
                    ),
                }))
              : []
          }
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          localeText={{
            toolbarDensity: "Size",
            toolbarDensityLabel: "Size",
            toolbarDensityCompact: "Small",
            toolbarDensityStandard: "Medium",
            toolbarDensityComfortable: "Large",
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          checkboxSelection
          onRowSelectionModelChange={handleSelected}
        />
        {isOpen && (
          <Modal isOpen={isOpen}>
            <FormFields />
          </Modal>
        )}
      </div>
    </>
  );
}
