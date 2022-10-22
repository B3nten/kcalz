import { Meals } from "./src/calories.ts";
import { TMeal } from "./src/types/model.ts";

const meals = new Meals();

const foodEmojis = [
	"🍏",
	"🍎",
	"🍐",
	"🍊",
	"🍋",
	"🍌",
	"🍉",
	"🍇",
	"🍓",
	"🍈",
	"🍒",
	"🍑",
	"🥭",
	"🍍",
	"🥥",
	"🥝",
	"🍅",
	"🍆",
	"🥑",
	"🥦",
	"🥬",
	"🥒",
	"🌶",
	"🌽",
	"🥕",
	"🥔",
	"🍠",
	"🥐",
	"🥯",
	"🍞",
	"🥖",
	"🥨",
	"🥞",
	"🧀",
	"🍖",
	"🍗",
	"🥩",
	"🥓",
	"🍔",
	"🍟",
	"🍕",
	"🌭",
	"🥪",
	"🌮",
	"🌯",
	"🥙",
	"🥚",
	"🍳",
	"🥘",
	"🍲",
	"🥣",
	"🥗",
	"🍿",
	"🧂",
	"🥫",
	"🍱",
	"🍘",
	"🍙",
	"🍚",
	"🍛",
	"🍜",
	"🍝",
	"🍠",
	"🍢",
	"🍣",
	"🍤",
	"🍥",
	"🥮",
	"🍡",
	"🥟",
	"🥠",
	"🥡",
	"🦪",
	"🍦",
	"🍧",
	"🍨",
	"🍩",
	"🍪",
	"🎂",
	"🍰",
	"🧁",
	"🥧",
	"🍫",
	"🍬",
	"🍭",
	"🍮",
	"🍯",
	"🍼",
	"🥛",
	"☕",
];

function emoji() { return foodEmojis[Math.floor(Math.random() * foodEmojis.length)]; }

function formatResponse(response: Array<TMeal> | unknown){
	if(response && Array.isArray(response) && response.length > -1){
		response.forEach((meal) => {
			if(!meal) return
			console.log(
				`${emoji()} ${meal.name} - ${meal.calories} kcal`,
				`${meal.carbs? 'Carbs: ' + meal.carbs : ""} `,
				`${meal.protein? 'Protein: ' + meal.protein : ""} `,
				`${meal.fat? 'Fat: ' + meal.fat : ""} `,
			);
		})
	}else{
		return ""
	}
}

console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")


while (true) {
	const input = prompt(
		emoji() + ": "
	);
	if (input) {
		try {
			console.log("")
			console.log(formatResponse(meals.parseCommand(input)) || '')
			console.log("")
		} catch (e) {
			let message =
				"...damnm, errored " +
				emoji()
			if (e instanceof Error) message = e.message;
			console.error(
				"\n",
				message +
					" " +
					emoji(),
				"\n"
			);
		}
	} else {
		console.error("\n...wtf...type something\n");
		continue;
	}
}
