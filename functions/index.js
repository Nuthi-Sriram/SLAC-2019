const functions = require("firebase-functions"),
	express = require("express"),
	app = express(),
	admin = require("firebase-admin");

admin.initializeApp({
	credential: admin.credential.applicationDefault()
});
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});
app.get("/contact", (req, res) => {
	res.render("contact");
});
app.get("/galleria", (req, res) => {
	res.render("galleria");
});
app.get("/showcase", (req, res) => {
	res.render("showcase");
});
app.get("/TC", (req, res) => {
	res.render("tc");
});
app.get("/culture", (req, res) => {
	res.render("culture");
});
app.get("/whatYouPay", (req, res) => {
	res.render("whatYouPay");
});
app.get("/whereWeWork", (req, res) => {
	res.render("whereWeWork");
});
app.get("/approverDashboard", (req, res) => {
	res.render("approver/dashboard");
});
app.get("/approverCapitanaDetails", (req, res) => {
	res.render("approver/capitana/details");
});
app.get("/approverCapitanaList2to7", (req, res) => {
	res.render("approver/capitana/list_2to7");
});
app.get("/approverCapitanaList7to15", (req, res) => {
	res.render("approver/capitana/list_7to15");
});
app.get("/approverCapitanaList24", (req, res) => {
	res.render("approver/capitana/list_24");
});
app.get("/approverCapitanaListM15", (req, res) => {
	res.render("approver/capitana/list_m15");
});
app.get("/approverCapitanaDetails", (req, res) => {
	res.render("approver/capitana/details");
});
app.get("/paymentDashboard", (req, res) => {
	res.render("payment/dashboard");
});
app.get("/paymentCapitanaList2to7", (req, res) => {
	res.render("payment/capitana/list_2to7");
});
app.get("/paymentCapitanaList7to15", (req, res) => {
	res.render("payment/capitana/list_7to15");
});
app.get("/paymentCapitanaList24", (req, res) => {
	res.render("payment/capitana/list_24");
});
app.get("/paymentCapitanaListM15", (req, res) => {
	res.render("payment/capitana/list_m15");
});
app.get("/paymentUserDetails", (req, res) => {
	res.render("payment/user/details");
});
app.get("/paymentUserFullDetails", (req, res) => {
	res.render("payment/user/fulldetails");
});

app.get("/login", (req, res) => {
	res.render("login");
});
app.post("/onLogin", (req, res) => {
	admin
		.auth()
		.verifyIdToken(req.body.idToken, true)
		.then((decodedToken) => {
			admin
				.auth()
				.getUser(decodedToken.uid)
				.then((userRecord) => {
					console.log(
						"Successfully fetched user data:",
						userRecord.toJSON()
					);
					if (userRecord.phoneNumber && userRecord.emailVerified) {
						return res.send({ path: "/dashboard" });
					} else if (!userRecord.emailVerified) {
						return res.send({ path: "/emailVerification" });
					} else {
						return res.send({ path: "/updateProfile" });
					}
				})
				.catch((error) => {
					console.log("Error fetching user data:", error);
					res.send("/login");
				});
			return;
		})
		.catch((error) => {
			console.log(error);
			res.send("/login");
		});
});
app.get("/emailVerification", (req, res) => {
	res.render("emailVerification");
});
app.get("/signOut", (req, res) => {
	res.render("signOut");
});
app.get("/updateProfile", (req, res) => {
	res.render("updateProfile");
});
app.post("/onUpdateProfile", (req, res) => {
	admin
		.auth()
		.updateUser(req.body.uid, {
			phoneNumber: "+91" + req.body.phoneNumber,
			password: req.body.password,
			displayName: req.body.firstName + " " + req.body.lastName,
			photoURL: req.body.photoURL
		})
		.then((userRecord) => {
			console.log("Successfully updated user", userRecord.toJSON());
			return res.redirect("/login");
		})
		.catch((error) => {
			console.log("Error updating user:", error);
		});
});

//routes for super
app.get("/SuperAddApprover", (req, res) => {
	res.render("superRyder/super_add_approver");
});
app.get("/SuperInsurance", (req, res) => {
	res.render("superRyder/super_insurance");
});
app.get("/SuperPayment", (req, res) => {
	res.render("superRyder/super_add_paymentad");
});
app.get("/SuperManage", (req, res) => {
	res.render("superRyder/super_approver_manage");
});
app.get("/SuperCapitanaPayment", (req, res) => {
	res.render("superRyder/super_capitana_payment");
});
app.get("/SuperCityAdd", (req, res) => {
	res.render("superRyder/super_city_add");
});
app.get("/SuperCityMaster", (req, res) => {
	res.render("superRyder/super_city_master");
});
app.get("/SuperCoupon", (req, res) => {
	res.render("superRyder/super_coupon_en-dis");
});
app.get("/SuperDashBoard", (req, res) => {
	res.render("superRyder/super_dashboard");
});
app.get("/SuperCapitanaPayment", (req, res) => {
	res.render("superRyder/super_capitana_payment");
});

app.get("/SuperModifyApprover", (req, res) => {
	res.render("superRyder/super_modify_approver");
});
app.get("/SuperModifyPayment", (req, res) => {
	res.render("superRyder/super_modify_paymentad");
});
app.get("/SuperNewCoupon", (req, res) => {
	res.render("superRyder/super_newcoupon");
});
app.get("/SuperNewNotification", (req, res) => {
	res.render("superRyder/super_newnotification");
});
app.get("/SuperNotifications", (req, res) => {
	res.render("superRyder/super_notification");
});
app.get("/SuperPaymentManage", (req, res) => {
	res.render("superRyder/super_payment_manage");
});
app.get("/SuperPricing", (req, res) => {
	res.render("superRyder/super_pricing");
});
app.get("/SuperRidingSettings", (req, res) => {
	res.render("superRyder/super_ryder_settings");
});
app.get("/SuperRyderStatistics", (req, res) => {
	res.render("superRyder/super_rydez_statistics");
});
app.get("/SuperWalletTrack", (req, res) => {
	res.render("superRyder/super_wallet_track");
});
app.get("/SuperDailyStatistics", (req, res) => {
	res.render("superRyder/super_daily_statistics");
});
app.get("/privacyPolicy", (req, res) => {
	res.render("privacyPolicy");
});
app.get("/EULA", (req, res) => {
	res.render("EULA");
});
app.get("/Disclaimer", (req, res) => {
	res.render("Disclaimer");
});
app.get("/corporateAndWorkCulture", (req, res) => {
	res.render("corporateAndWorkCulture");
});
app.get("/otpadmin", (req, res) => {
	res.render("otpadmin");
});
app.use((req, res, next) => {
	res.status(404).render("404");
});
exports.app = functions.https.onRequest(app);
