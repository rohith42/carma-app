import Svg, { Path } from "react-native-svg";

export default function ProfileIcon({ color }) {
    return (
        <Svg width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M2 10.4L18.5 2L35 10.4L18.5 18.8L2 10.4Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round"/>
            <Path d="M35.0005 10.51V19.733M9.50098 14.825V27.267C9.50098 27.267 13.2763 32 18.5005 32C23.7256 32 27.5009 27.267 27.5009 27.267V14.825" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M0.430176 -7H38.105V41H0.430176V-7Z" fill={color}/>
        </Svg>
    );
}