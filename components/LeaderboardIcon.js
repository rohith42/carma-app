import Svg, { Path } from "react-native-svg";

export default function LeaderboardIcon({ color }) {
    return (
        <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1.65 33C1.1825 33 0.7909 32.824 0.4752 32.472C0.1584 32.1212 0 31.6861 0 31.1667V12.8333C0 12.3139 0.1584 11.8782 0.4752 11.5262C0.7909 11.1754 1.1825 11 1.65 11H7.425C7.8925 11 8.28465 11.1754 8.60145 11.5262C8.91715 11.8782 9.075 12.3139 9.075 12.8333V31.1667C9.075 31.6861 8.91715 32.1212 8.60145 32.472C8.28465 32.824 7.8925 33 7.425 33H1.65ZM13.6125 33C13.145 33 12.7534 32.824 12.4377 32.472C12.1209 32.1212 11.9625 31.6861 11.9625 31.1667V1.83333C11.9625 1.31389 12.1209 0.878167 12.4377 0.526167C12.7534 0.175389 13.145 0 13.6125 0H19.3875C19.855 0 20.2472 0.175389 20.5639 0.526167C20.8797 0.878167 21.0375 1.31389 21.0375 1.83333V31.1667C21.0375 31.6861 20.8797 32.1212 20.5639 32.472C20.2472 32.824 19.855 33 19.3875 33H13.6125ZM25.575 33C25.1075 33 24.7159 32.824 24.4002 32.472C24.0834 32.1212 23.925 31.6861 23.925 31.1667V16.5C23.925 15.9806 24.0834 15.5448 24.4002 15.1928C24.7159 14.8421 25.1075 14.6667 25.575 14.6667H31.35C31.8175 14.6667 32.2091 14.8421 32.5248 15.1928C32.8416 15.5448 33 15.9806 33 16.5V31.1667C33 31.6861 32.8416 32.1212 32.5248 32.472C32.2091 32.824 31.8175 33 31.35 33H25.575Z" 
            fill={color}/>
        </Svg>
    );
}