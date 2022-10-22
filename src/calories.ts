import { DB } from "sqlite";
import { TMeal } from "./types/model.ts";
import { produce } from "immer";
import { parse as parseArgs } from "parse";
import { parse as parseDate } from "datetime";

type TUpdateMeal =
	| { id: number; name?: string; newState: Partial<TMeal> }
	| { name: string; id?: number; newState: Partial<TMeal> };

type TDeleteMeal =
	| { id: number; name?: string }
	| { name: string; id?: number };

type TFilters = {
	useFilters: boolean;
	b: boolean;
	l: boolean;
	d: boolean;
	s: boolean;
};

export class Meals {
	db: DB;
	constructor() {
		this.db = new DB("db.db");
		this.db.execute(`
  			CREATE TABLE IF NOT EXISTS meals (
    			id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT,
				date TEXT NOT NULL,
				notes TEXT,
				protein INTEGER,
				carbs INTEGER,
				fat INTEGER,
				calories INTEGER,
				breakfast INTEGER,
				lunch INTEGER,
				dinner INTEGER,
				snack INTEGER
  			)
		`);
	}

	private handleBoolean = (val: unknown) => (val ? 1 : 0);
	getPreviousDay(date = 1) {
		const previous = new Date();
		previous.setDate(previous.getDate() - date);
		return previous;
	}
	stringIsValidDate(date: string) {
		const regexExp =
			/(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi;
		return regexExp.test(date); // true
	}

	addMeal(meal: TMeal) {
		this.db.query(
			"INSERT INTO meals (name, date, notes, protein, carbs, fat, calories, breakfast, lunch, dinner, snack) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				meal.name,
				meal.date,
				meal.notes,
				meal.protein,
				meal.carbs,
				meal.fat,
				this.handleBoolean(meal.calories),
				this.handleBoolean(meal.breakfast),
				this.handleBoolean(meal.lunch),
				this.handleBoolean(meal.dinner),
				this.handleBoolean(meal.snack),
			]
		);
	}
	updateMeal({ id, name, newState }: TUpdateMeal) {
		const data = this.db.queryEntries(
			`SELECT * from meals WHERE id=${id || 0} or name='${name || ""}'`
		);
		if (data[0]) {
			const meal = produce(data[0], (draft: TMeal) => {
				Object.assign(draft, newState);
			});
			this.db.query(
				"UPDATE meals SET name=?, date=?, notes=?, protein=?, carbs=?, fat=?, calories=?, breakfast=?, lunch=?, dinner=?, snack=? WHERE id=?",
				[
					meal.name,
					meal.date,
					meal.notes,
					meal.protein,
					meal.carbs,
					meal.fat,
					meal.calories,
					this.handleBoolean(meal.breakfast),
					this.handleBoolean(meal.lunch),
					this.handleBoolean(meal.dinner),
					this.handleBoolean(meal.snack),
					data[0].id,
				]
			);
		}
	}
	deleteMeal({ id, name }: TDeleteMeal) {
		this.db.query(
			`DELETE FROM meals WHERE id=${id || 0} or name='${name || ""}'`
		);
	}
	deleteDay({ date = "", day = 0 }: { date: string; day: number }) {
		this.db.query(`DELETE FROM meals WHERE date=? or day=?`, [date, day]);
	}
	getAllMeals() {
		return this.db.queryEntries("SELECT * from meals");
	}
	get(params: string[]) {
		// Options
		// 1. Get all meals: 'all'
		// 2. Get meals by date: '03/01/2021'
		// 3. Get meals by day: "Today, Yesterday, # days ago"
		// 4. Get meals by name: 'name'
		// 5. Get meals by id: 'id'
		// filter all meals by flag
		// Will also need to deal with range

		const args = parseArgs(params);

		const filters: TFilters = {
			useFilters: args.b || args.l || args.d || args.s,
			b: args.b,
			l: args.l,
			d: args.d,
			s: args.s,
		};
		if (args._[0] === "all") {
			const query = this.db.queryEntries("SELECT * from meals");
			return query;
		}
		if (this.stringIsValidDate(args._[0] as string)) {
			const unformattedDate = (args._[0] as string)
				.replaceAll("/", "-")
				.replaceAll(".", "-");
			const date = parseDate(unformattedDate, "dd-MM-yyyy");
			const query = this.db.queryEntries("SELECT * from meals WHERE date like ?", [
				date.toISOString().split("T")[0] + "%",
			]);
			return query;
		}
		if (args._[0] === "today") {
			const query = this.db.queryEntries("SELECT * from meals WHERE date like ?", [
				new Date().toISOString().split("T")[0] + "%",
			]);
			return query;
		}
		if (args._[0] === "yesterday") {
			const query = this.db.queryEntries("SELECT * from meals WHERE date like ?", [
				this.getPreviousDay().toISOString().split("T")[0] + "%",
			]);
			return query;
		}
		if (
			(args._[1] === "days ago" || args._[1] === "day ago") &&
			typeof args._[0] === "number"
		) {
			console.log(
				this.getPreviousDay(args._[0]).toISOString().split("T")[0] + "%"
			);
			const query = this.db.queryEntries("SELECT * from meals WHERE date like ?", [
				this.getPreviousDay(args._[0]).toISOString().split("T")[0] + "%",
			]);
			return query;
		}
		if (args._[0] === "range") {
			// Get meals by range
		}
		if (typeof args._[0] === "string") {
			const query = this.db.queryEntries("SELECT * from meals WHERE name=?", [
				args._[0],
			]);
			return query;
		}
		if (typeof args._[0] === "number") {
			const query = this.db.queryEntries("SELECT * from meals WHERE id=?", [
				args._[0],
			])
			return query;
		}
	}
	parseCommand(input: string) {

		const array = input.split(" ")
		const command = array.splice(0, 1)[0];
		const args = parseArgs(array)
		if(command === 'add'){
			// add mealName -p 10 -c 10 -f 10 -b -l -d -s
			this.addMeal({
				name: args._[0],
				date: this.stringIsValidDate(args.date) ? parseDate(args.date, "dd-MM-yy").toISOString() : new Date().toISOString(),
				notes: args.notes,
				protein: args.p,
				carbs: args.c,
				fat: args.f,
				calories: args._[1],
				breakfast: args.b,
				lunch: args.l,
				dinner: args.d,
				snack: args.s,
			})
		}
	}
}
