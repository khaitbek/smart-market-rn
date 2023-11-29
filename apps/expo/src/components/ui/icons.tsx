import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function FavoriteIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16.5 2.825c-1.74 0-3.41.81-4.5 2.09-1.09-1.28-2.76-2.09-4.5-2.09-3.08 0-5.5 2.42-5.5 5.5 0 3.78 3.4 6.86 8.55 11.54l1.45 1.31 1.45-1.32c5.15-4.67 8.55-7.75 8.55-11.53 0-3.08-2.42-5.5-5.5-5.5zm-4.4 15.55l-.1.1-.1-.1C7.14 14.065 4 11.215 4 8.325c0-2 1.5-3.5 3.5-3.5 1.54 0 3.04.99 3.57 2.36h1.87c.52-1.37 2.02-2.36 3.56-2.36 2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        fill="#095AE3"
      />
    </Svg>
  );
}

export function PhoneIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M18.308 15.275c0 .3-.067.608-.208.908-.142.3-.325.584-.567.85-.408.45-.858.775-1.367.984-.5.208-1.041.316-1.625.316-.85 0-1.758-.2-2.716-.608a14.634 14.634 0 01-2.867-1.65 23.961 23.961 0 01-2.733-2.333A23.68 23.68 0 013.9 11.017c-.683-.95-1.233-1.9-1.633-2.842-.4-.95-.6-1.858-.6-2.725 0-.567.1-1.108.3-1.608.2-.509.516-.975.958-1.392.533-.525 1.117-.783 1.733-.783.233 0 .467.05.675.15.217.1.409.25.558.466l1.934 2.725c.15.209.258.4.333.584.075.175.117.35.117.508 0 .2-.059.4-.175.592a2.835 2.835 0 01-.467.591L7 7.942a.446.446 0 00-.133.333c0 .067.008.125.024.192.026.066.05.116.067.166.15.275.409.634.775 1.067.375.433.775.875 1.208 1.317.45.441.884.85 1.325 1.225.434.366.792.616 1.075.766.042.017.092.042.15.067a.575.575 0 00.209.033c.142 0 .25-.05.341-.141l.634-.625c.208-.209.408-.367.6-.467a1.11 1.11 0 01.591-.175c.159 0 .325.033.509.108.183.075.375.184.583.325l2.758 1.959c.217.15.367.325.459.533.083.208.133.417.133.65z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export function EyeIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ProductLocationIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10 11.192a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2z"
        stroke="#979797"
        strokeWidth={1.5}
      />
      <Path
        d="M3.017 7.075C4.658-.142 15.35-.133 16.983 7.083c.959 4.234-1.675 7.817-3.983 10.034a4.328 4.328 0 01-6.008 0c-2.3-2.217-4.934-5.809-3.975-10.042z"
        stroke="#979797"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export function MainPageTabIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM2 5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm10 7c-2.761 0-5-2.686-5-6h2c0 2.566 1.67 4 3 4s3-1.434 3-4h2c0 3.314-2.239 6-5 6z"
        fill="#AFB6C0"
      />
    </Svg>
  );
}

export function CategoryPageTabIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16 6a2 2 0 104 0 2 2 0 00-4 0zM16 12a2 2 0 104 0 2 2 0 00-4 0zM18 20a2 2 0 110-4 2 2 0 010 4zM10 6a2 2 0 104 0 2 2 0 00-4 0zM12 14a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 104 0 2 2 0 00-4 0zM6 8a2 2 0 110-4 2 2 0 010 4zM4 12a2 2 0 104 0 2 2 0 00-4 0zM6 20a2 2 0 110-4 2 2 0 010 4z"
        fill="#AFB6C0"
      />
    </Svg>
  );
}

export function FavoritesPageTabIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16.5 2.825c-1.74 0-3.41.81-4.5 2.09-1.09-1.28-2.76-2.09-4.5-2.09-3.08 0-5.5 2.42-5.5 5.5 0 3.78 3.4 6.86 8.55 11.54l1.45 1.31 1.45-1.32c5.15-4.67 8.55-7.75 8.55-11.53 0-3.08-2.42-5.5-5.5-5.5zm-4.4 15.55l-.1.1-.1-.1C7.14 14.065 4 11.215 4 8.325c0-2 1.5-3.5 3.5-3.5 1.54 0 3.04.99 3.57 2.36h1.87c.52-1.37 2.02-2.36 3.56-2.36 2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        fill="#AFB6C0"
      />
    </Svg>
  );
}

export function CartPageTabIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.792 2H1v2h3.218l2.77 12.678H7V17h13v-.248l2.193-9.661L22.531 6H6.655l-.57-2.611L5.792 2zm14.195 6H7.092l1.529 7h9.777l1.589-7z"
        fill="#095AE3"
      />
      <Path
        d="M10 22a2 2 0 100-4 2 2 0 000 4zM19 20a2 2 0 11-4 0 2 2 0 014 0z"
        fill="#095AE3"
      />
    </Svg>
  );
}

export function AccountPageTabIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15 14a1 1 0 110-2 1 1 0 010 2zM8 13a1 1 0 102 0 1 1 0 00-2 0z"
        fill="#AFB6C0"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2A8 8 0 014.366 9.6c.835.226 1.713.346 2.619.346a9.996 9.996 0 008.692-5.053A8 8 0 0112 20z"
        fill="#AFB6C0"
      />
    </Svg>
  );
}
