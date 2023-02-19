import Svg, { Path } from "react-native-svg";

export default function InsightsIcon({ color }) {
    return (
        <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1.83333 18.3333H12.8333C13.8417 18.3333 14.6667 17.5083 14.6667 16.5V1.83333C14.6667 0.825 13.8417 0 12.8333 0H1.83333C0.825 0 0 0.825 0 1.83333V16.5C0 17.5083 0.825 18.3333 1.83333 18.3333ZM1.83333 33H12.8333C13.8417 33 14.6667 32.175 14.6667 31.1667V23.8333C14.6667 22.825 13.8417 22 12.8333 22H1.83333C0.825 22 0 22.825 0 23.8333V31.1667C0 32.175 0.825 33 1.83333 33ZM20.1667 33H31.1667C32.175 33 33 32.175 33 31.1667V16.5C33 15.4917 32.175 14.6667 31.1667 14.6667H20.1667C19.1583 14.6667 18.3333 15.4917 18.3333 16.5V31.1667C18.3333 32.175 19.1583 33 20.1667 33ZM18.3333 1.83333V9.16667C18.3333 10.175 19.1583 11 20.1667 11H31.1667C32.175 11 33 10.175 33 9.16667V1.83333C33 0.825 32.175 0 31.1667 0H20.1667C19.1583 0 18.3333 0.825 18.3333 1.83333Z" 
            fill={color}/>
        </Svg>
    );
}