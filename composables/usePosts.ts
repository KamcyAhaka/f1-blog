export default () => {
	const useLatestPosts = () => {
		return [
			{
				author: "John Doe",
				imgUrl: "https://example.com/image1.jpg",
				title: "Lewis Hamilton Wins Monaco Grand Prix",
				date: "2023-05-15",
				length: 78,
				tag: "Race Report",
				text: "In a stunning display of skill, Hamilton secured victory in Monaco, solidifying his dominance this season.",
			},
			{
				author: "Sarah Smith",
				imgUrl: "https://example.com/image2.jpg",
				title: "Red Bull Racing's New Aerodynamic Innovation",
				date: "2023-06-02",
				length: 65,
				tag: "Technical Update",
				text: "Red Bull Racing unveils a groundbreaking aero concept, promising a significant performance boost.",
			},
			{
				author: "Emma White",
				imgUrl: "https://example.com/image4.jpg",
				title: "Mercedes and Red Bull Locked in Intense Rivalry",
				date: "2023-04-10",
				length: 84,
				tag: "Rivalry Watch",
				text: "The battle between Mercedes and Red Bull continues to heat up, creating an electrifying season for F1 fans.",
			},
			{
				author: "David Clark",
				imgUrl: "https://example.com/image5.jpg",
				title: "2023 F1 Calendar Released",
				date: "2023-02-15",
				tag: "Calendar Update",
				text: "The official F1 calendar for 2023 is out, featuring new additions and some fan-favorite tracks.",
			},
		];
	};

	return { useLatestPosts };
};
