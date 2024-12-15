import { useForm, Controller } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';



function ProductsFormPage() {
  const server = import.meta.env.VITE_BASE_URL+"/img/";
  
  const { register, handleSubmit, control, setValue} = useForm({
    defaultValues: {
      name:'',
      price: 0.0,
      year: 2024,
      image: uploadIcon
    }
  }); 
  const { products, createProduct, getProduct, updateProductNoUpdateImage, updateProduct } = useProducts();
  const [selectedImage, setSelectedImage] = useState(uploadIcon); 
  const inputImage = useRef(null);
  const navigate =useNavigate();
  const params = useParams();
  const [updateImage, setUpdateImage]= useState(false);

  useEffect( ()=>{
    async function loadProduct() {
      console.log(params);
      if(params.id){
        const product = await getProduct(params.id);
        console.log(product);
        setValue('name',product.name);
        setValue('price',product.price);
        setValue('year', product.year);
        setValue('image', product.image);
        setSelectedImage(server+product.image);

      }
    
 
  }
    loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  console.log(products);

  const onSubmit = handleSubmit(async (data) => { 
    const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("year", data.year);
      formData.append("image", data.image); // data.image debe ser un archivo





  if(params.id){
    if(!updateImage){
      const updateData = {
        "name": data.name,
        "price": data.price.toString(),
        "year": data.year.toString(),
        "image": data.image
      }
      updateProductNoUpdateImage(params.id, updateData);
    
  }else{
        updateProduct(params.id, formData);
       }
      }else{
        createProduct(formData); // Usa FormData para creación

      }
      navigate("/products");  
  });
  
  

  const handleImageClick = () => { 
    inputImage.current.click();
  };

  const handleImageChange = (e, field) => { 
    const file = e.target.files[0];
    setSelectedImage(file ? URL.createObjectURL(file) : uploadIcon);
      field.onChange(file);
      setUpdateImage(true);
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
      <h1 className="text-2x1 text-center font-bold my-4">Registrar De Productos  </h1>
      <label htmlFor="name">Nombre  </label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Nombre del producto"
          {...register("name")}
          autoFocus
        />
        <label htmlFor="price">Precio  </label>
        <input
          type="number"
          step="0.10"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Precio del producto"
          {...register("price", {
            valueAsNumber: true,
          })}
        />
          <label htmlFor="year">Año </label>
        <input
          type="number"
          max="2024"
          min="1900"
          step="1"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Año del producto"
          {...register("year", {
            valueAsNumber: true,
          })}
        />
          <label htmlFor="username">Insertar Imagen  </label>
        <div className="py-2 my-2">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              width={200}
              height={200}
              className="max-h[200px] object-contain"
              onClick={handleImageClick} // Corregido handleImageClick
            />
          )}
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                ref={inputImage}
                onChange={(e) => handleImageChange(e, field)} // Corregido handleImageChange
                className="hidden"
              />
            )}
          />
        </div>
        <button className="bg-transparent hover:bg-zinc-500
        text-zinc-500 fron-semibold hover:text-white 
        py-2 px-4 border border-zinc-500
        hover:border-transparent rounded"
        type="submit"> Guardar 
        
        </button>

        
        <button className="bg-red-300 ml-4 hover:bg-red-700
        text-white fron-semibold 
        py-2 px-4 border border-zinc-500
        hover:border-transparent rounded"
     onClick={()=>{navigate('/products')}}
     
     >
        Cancelar  
        
        </button>


        
      </form>
    </div>
    </div>
  );
}

export default ProductsFormPage;
