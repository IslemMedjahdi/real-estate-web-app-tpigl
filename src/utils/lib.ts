export const imageUrl = (id: number) => {
  return process.env.NEXT_PUBLIC_BACKEND_URL + "/pictures/" + id;
};
export const time_ago = (time: any) => {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "secondes", 1], // 60
    [120, "il y a 1 minute", "dans 1 minute"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "Il ya 1 heure", "1 heure à partir de maintenant"], // 60*60*2
    [86400, "heures", 3600], // 60*60*24, 60*60
    [172800, "Hier", "Demain"], // 60*60*24*2
    [604800, "jours", 86400], // 60*60*24*7, 60*60*24
    [1209600, "La semaine dernière", "La semaine prochaine"], // 60*60*24*7*4*2
    [2419200, "semaines", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Le mois dernier", "Le mois prochain"], // 60*60*24*7*4*2
    [29030400, "mois", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "L'année dernière", "L'année prochaine"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Le siècle dernier", "Siècle suivant"], // 60*60*24*7*4*12*100*2
    [58060800000, "des siècles", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "Il y a",
    list_choice = 1;

  if (seconds == 0) {
    return "Juste maintenant";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "à partir de maintenant";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return token + " " + Math.floor(seconds / format[2]) + " " + format[1];
    }
  return time;
};

export const formatDate = (date: Date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
