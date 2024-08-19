import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo, SiAtari, SiCommodore, SiSega, SiD3Dotjs } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { HStack, Icon } from "@chakra-ui/react";
import { Platform } from "../hooks/useGames";
import { IconType } from "react-icons";
import { IoLogoGameControllerA } from "react-icons/io";

interface Props {
	platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
	const iconMap: { [key: string]: IconType } = {
		pc: FaWindows,
		playstation: FaPlaystation,
		xbox: FaXbox,
		nintendo: SiNintendo,
		mac: FaApple,
		linux: FaLinux,
		ios: MdPhoneIphone,
		android: FaAndroid,
		web: BsGlobe,
		atari: SiAtari,
		"commodore-amiga": SiCommodore,
		sega: SiSega,
		"3do": SiD3Dotjs,
		"neo-geo": IoLogoGameControllerA
	};

	return (
		<HStack marginY={1}>
			{platforms.map((platform) => (
				<Icon key={platform.id} as={iconMap[platform.slug]} color="gray.500" fontSize="xl" /> // Different size for Nintendo because the icon is smaller.
			))}
		</HStack>
	);
};

export default PlatformIconList;
