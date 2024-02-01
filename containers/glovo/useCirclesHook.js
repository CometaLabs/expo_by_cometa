import { useMemo } from "react";
import { Dimensions, Platform } from "react-native";

import  { useSharedValue } from "react-native-reanimated";

import { circleDiameter } from "./Circle";

const screenWidth = Dimensions.get("window")?.width;
const width = Platform.select({
  default: screenWidth,
  web: screenWidth > 992 ? 500 : screenWidth,
});
const radius = width * 0.35;

const items = [
  {
    pic: "https://images.deliveryhero.io/image/customer-assets-glovo/category_group_icons/0c599e6e1223e058589c6b225e29197997716673941ee4b53b06f4d99870b9f0?t=W3siYXV0byI6eyJxIjoiaGlnaCJ9fSx7InJlc2l6ZSI6eyJtb2RlIjoiZml0Iiwid2lkdGgiOjEyMCwiaGVpZ2h0IjoxMjB9fV0=",
    name: "Parafarmacia y Tiendas",
  },
  {
    pic: "https://images.deliveryhero.io/image/customer-assets-glovo/category_icons/d6dc3a6aef94335ef66f9de4396eaafd4bba572a3b2c244f527e670e648a5dbe?t=W3siYXV0byI6eyJxIjoiaGlnaCJ9fSx7InJlc2l6ZSI6eyJtb2RlIjoiZml0Iiwid2lkdGgiOjEyMCwiaGVpZ2h0IjoxMjB9fV0=",
    name: "Supermercado",
  },
  {
    pic: "https://res.cloudinary.com/glovoapp/c_fit,f_auto,e_trim,q_auto:best,h_120,w_120/CategoryGroups/czzwapmtrc28kfgjlhqq",
    name: "Comida",
  },
  {
    pic: "https://images.deliveryhero.io/image/customer-assets-glovo/category_group_icons/7b577600a9c5cd2b3ed6cd71ca8bd0cef43b59b9dfd9842cf4fae98142a65f8f?t=W3siYXV0byI6eyJxIjoiaGlnaCJ9fSx7InJlc2l6ZSI6eyJtb2RlIjoiZml0Iiwid2lkdGgiOjEyMCwiaGVpZ2h0IjoxMjB9fV0=",
    name: "Alta Cocina",
  },
  {
    pic: "https://res.cloudinary.com/glovoapp/c_fit,f_auto,e_trim,q_auto:best,h_120,w_120/StoreCategories/qoapwqjuklkgedcpgqfi",
    name: "Super Glovo",
  },
  {
    pic: "https://res.cloudinary.com/glovoapp/c_fit,f_auto,e_trim,q_auto:best,h_120,w_120/StoreCategories/ztpx3chnuicovemedi66",
    name: "Drinks",
  },
  {
    pic: "https://res.cloudinary.com/glovoapp/c_fit,f_auto,e_trim,q_auto:best,h_120,w_120/CategoryGroups/vqz1qhe8tdongpbkcqdv",
    name: "Parafarmacia y Belleza",
  },
];
const circleDiameter2 = circleDiameter + 1;
const useSetup = ({ dimensions, numCircles }) => {
  const circles = useMemo(() => {
    const circles = [
      {
        x: useSharedValue(0),
        y: useSharedValue(0),
        initialX: 0,
        initialY: 0,
        isCenter: true,
        item: {
          pic: "https://res.cloudinary.com/glovoapp/c_fit,f_auto,e_trim,q_auto:best,h_120,w_120/CategoryGroups/nivqqpplsuenepcddnps",
          name: "Pedidos personalizados",
        },
        weight: 1.5,
      },
    ];
    const angleStep = (2 * Math.PI) / (numCircles - 1);
    for (let i = 0; i < numCircles - 1; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      circles.push({
        x: useSharedValue(x),
        y: useSharedValue(y),
        initialX: x,
        initialY: y,
        item: items[i],
        weight: 1,
      });
    }
    return circles;
  }, [dimensions]);

  return circles;
};

export const useGravityAnimation = ({ dimensions, numCircles }) => {
  const circles = useSetup({ dimensions, numCircles });
  return circles;
};
