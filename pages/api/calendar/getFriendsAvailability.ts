// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/client";

// import { getIDByUsername, getUserEvents, getUsernameByID, getUserRecurringEvents } from "../../../util/databaseRoutes";

// // Load duration plugin
// dayjs.extend(duration);

// // Requires an input of:
// //      friends: array of friend usernames
// //      startDay: datestring of start of period, specifying a day
// //      endDay: datestring of end of period, specifying a day
// //      startTime: 0-23, representing the hours we are using
// //      endTime: 0-23, representing the hours we are using
// export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
//     const session = await getSession({ req });

//     if (
//         session.accessToken &&
//         typeof req.query.friends == "object" &&
//         typeof req.query.startDay == "string" &&
//         typeof req.query.endDay == "string" &&
//         typeof req.query.startHour == "string" &&
//         typeof req.query.endHour == "string"
//     ) {
//         const startHour = Number(req.query.startHour);
//         const endHour = Number(req.query.endHour);
//         const startDay = dayjs(req.query.startDay);
//         const endDay = dayjs(req.query.endDay);

//         const friends = req.query.friends;
//         // Dumb way to get a dict with keys from startHour to endHour inclusive. Feel free to replace if better
//         // way is found
//         const hoursNotAvailable = Array.from(new Array(endHour - startHour + 1), (x, i) => i + startHour).reduce(
//             function (obj, x) {
//                 obj[x] = [];
//                 return obj;
//             },
//             {}
//         );

//         // Get number of days in our duration
//         const dayDuration = dayjs.duration(endDay.diff(startDay)).asDays();

//         const timesNotAvailable = Array.from(new Array(dayDuration + 1), (x, i) => i).reduce(function (obj, x) {
//             obj[x] = Object.assign({}, hoursNotAvailable);
//             return obj;
//         }, {});

//         for (const friend of friends) {
//             const friendID = getIDByUsername(friend);
//             const friendEvents = getUserEvents(friendID);
//             const friendRecurringEvents = getUserRecurringEvents(friendID);

//             for (const event of friendEvents) {
//                 if (event.startTime.isAfter(startDay.startOf("day")) && event.endTime.isBefore(endDay.endOf("day"))) {
//                     for (const day in timesNotAvailable) {

//                     }
//                 }
//             }

//             for (const event of friendRecurringEvents) {
//                 if (
//                     event.startTime.isBefore(dayjs()) &&
//                     event.endTime.isAfter(dayjs()) &&
//                     event.dayOfWeek == dayjs().day()
//                 ) {
//                     available = false;
//                 }
//             }

//             if (available) {
//                 availableFriends.push(friend);
//             }
//         }

//         const availableFriendUsernames = availableFriends.map((id) => getUsernameByID(id));

//         res.status(200).json(availableFriendUsernames);
//     } else {
//         res.status(500);
//     }
// };
