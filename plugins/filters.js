import Vue from "vue";
// import { formatRelative, subDays } from "date-fns";


// Vue.filter("dateFrom", value => {
//   if (!value) return "";
//   //return formatDistance(subDays(new Date(value), new Date()));
//   return formatRelative(subDays(new Date(value), 0), new Date());
// });

// Vue.filter("truncate", (text, length) => {
//   let clamp = "...";
//   var node = document.createElement("div");
//   node.innerHTML = text;
//   var content = node.textContent;
//   return content.length > length ? content.slice(0, length) + clamp : content;
// });

Vue.filter("noExtension", (text, length) => {
  
  if (text && typeof text == 'string') {
    if (text.includes(".") && !text.includes("...")) {
      return text.slice(0, text.indexOf("."));
    } else {
      return text;
    }
  }
});

// Vue.filter("initials", (text) => {
//   const fullName = text.split(" ");
//   const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
//   return initials.toUpperCase();
// });

// Vue.filter("toTime", duration => {
//   // Hours, minutes and seconds
//   var hrs = ~~(duration / 3600);
//   var mins = ~~((duration % 3600) / 60);
//   var secs = ~~duration % 60;

//   // Output like "1:01" or "4:03:59" or "123:03:59"
//   var ret = "";

//   if (hrs > 0) {
//     ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
//   }

//   ret += "" + mins + ":" + (secs < 10 ? "0" : "");
//   ret += "" + secs;

//   return ret;
// });

// Vue.filter("toSize", bytes => {
//   const decimals = 2;
//   if (bytes === 0) return "0 Bytes";

//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
// });
