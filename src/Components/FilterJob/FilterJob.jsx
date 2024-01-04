import React, { useEffect, useState } from "react";
import "./FilterJob.css";
import iconCate from "./../../images/iconCategory.svg";
import iconCateOpen from "./../../images/iconCategoryOpen.svg";
import iconPlace from "./../../images/iconPlace.svg";
import iconPlaceOpen from "./../../images/iconPlaceOpen.svg";
import iconFilter from "./../../images/filter.svg";
import {
  category,
  occupation,
  ocuppationHome,
  occupationTecnology,
  place,
  occupationCulinary,
  occupationCoffee,
  occupationProduction,
  occupationShow,
  occupationVentas,
  occupationHealth,
  occupationEducation,
  occupationSecurity,
  occupationArt,
  occupationProfessional,
  occupationEvironmental,
  occupationMotorizado,
  occupationLimpieza,
} from "./FilesUi/data";
import { Select, SelectItem } from "@nextui-org/select";

import 'animate.css';
import { useContextPublication } from "../../Context/contextPublication";
const FilterJob = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    category: "Construcción",
  });
  const {setPostsAvailableCategory,postsAvailableCategory,setPostsAvailablePlace}= useContextPublication();
  const [userInteractedFilter, setUserInteractedFilter] = useState({
    changeCategory: false,
    changeOccupation: false,
    changePlace: false,
  });
  const [dataFilter, setDataFilter] = useState({
    category: "",
    occupation: "",
    place: "",
  });
  useEffect(() => {
    setPostsAvailableCategory(dataFilter.category);
    setPostsAvailablePlace(dataFilter.place)
  }, [dataFilter]);
  


  const handleValue = (e) => {
    const { name, value } = e.target;
    setSelectedCategory({
      ...selectedCategory,
      [name]: value,
    });
    setDataFilter({ ...dataFilter, [name]: value });
  };
  if (dataFilter.category !== "") {
    userInteractedFilter.changeCategory = true;
  }
  if (dataFilter.occupation !== "") {
    userInteractedFilter.changeOccupation = true;
  }
  if (dataFilter.place !== "") {
    userInteractedFilter.changePlace = true;
  }

  return (
    <div className="container-filter">
  
  <div className="filter-text">
            Filtrar Trabajo
          </div>

      <div className="filter-btns">
        <div className="filter-btn filter-value">
         
          <Select
            className="dark text-foreground bg-background max-w-xs select"
            label="Categoria"
            placeholder="Selecciona un Rugro"
            startContent={
              userInteractedFilter.changeCategory ? 
              (

                <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />

              ) : (

                <img src={iconCate} width={15} height={15} alt="iconCate" />

              )

            }
            defaultSelectedKeys={["Todos los trabajos"]}
            name="category"
            onChange={handleValue}
          >
            {category.map((animal) => (
              <SelectItem
                color="default"
                key={animal.value}
                value={animal.value}
              >
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        
{/* 
        <div className="filter-btn filter-value">
          {selectedCategory.category === "Construcción" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs category"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupation.value}
            >
       
              {occupation.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))} 
            </Select>

          ) : selectedCategory.category === "Hogar" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={

                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )

              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={ocuppationHome.value}
            >
              {ocuppationHome.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Produccíon" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={

                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )

              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationProduction.value}
            >
              {occupationProduction.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          )  : selectedCategory.category === "Motorizado" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={

                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )

              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationMotorizado.value}
            >
              {occupationMotorizado.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          )  : selectedCategory.category === "Limpieza general" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={

                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )

              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationLimpieza.value}
            >
              {occupationLimpieza.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Cocina en general" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={

                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )

              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationCulinary.value}
            >
              {occupationCulinary.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ) : selectedCategory.category === "Cafetería" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={

                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )

              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationCoffee.value}
            >
              {occupationCoffee.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Cafetería" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={

                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )

              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationCoffee.value}
            >
              {occupationCoffee.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Tecnología" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationTecnology.value}
            >
              {occupationTecnology.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Espectaculos" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationShow.value}
            >
              {occupationShow.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ) : selectedCategory.category === "Atención al cliente" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationVentas.value}
            >
              {occupationVentas.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ) : selectedCategory.category === "Salud" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationHealth.value}
            >
              {occupationHealth.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Educación" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationEducation.value}
            >
              {occupationEducation.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Seguridad" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationSecurity.value}
            >
              {occupationSecurity.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ) : selectedCategory.category === "Arte y Entreten." ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationArt.value}
            >
              {occupationArt.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ) : selectedCategory.category === "Serv. Profesionales" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationProfessional.value}
            >
              {occupationProfessional.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): selectedCategory.category === "Medio Ambiente" ? (
            <Select
              className="dark text-foreground bg-background max-w-xs"
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupationEvironmental.value}
            >
              {occupationEvironmental.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          ): (
            <Select
              className="dark text-foreground bg-background max-w-xs "
              label="Ocupación"
              placeholder="Selecciona una ocupación"
              startContent={
                userInteractedFilter.changeOccupation ? (
                  <img src={iconCateOpen} width={15} height={15} alt="iconCateOpen" />
                ) : (
                  <img src={iconCate} width={15} height={15} alt="iconCate" />
                )
              }
              onChange={handleValue}
              name="occupation"
              defaultSelectedKeys={occupation.value}
            >
              {occupation.map((occupation) => (
                <SelectItem
                  color="default"
                  key={occupation.value}
                  value={occupation.value}
                >
                  {occupation.label}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
 */}


        <div className="filter-btn filter-value-lugar ">
          <Select
            className="dark text-foreground bg-background max-w-xs place"
            label="Lugar"
            startContent={
              userInteractedFilter.changePlace ? (
                <img src={iconPlaceOpen} width={15} height={15} alt="iconCateOpen" />
              ) : (
                <img src={iconPlace} width={15} height={15} alt="iconCate" />
              )
            }
            onChange={handleValue}
            name="place"
            defaultSelectedKeys={["Todo Lima"]}
          >
            {place.map((animal) => (
              <SelectItem
                className="selectItm"
                color="default"
                key={animal.value}
                value={animal.value}
              >
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
     
    </div>
  );
};

export default FilterJob;
