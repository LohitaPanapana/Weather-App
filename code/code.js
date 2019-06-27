module.exports = {
    getUnique : function(data){
        var today = data[0].dt_txt.substring(0, 10);
        var weatherMap = new Map();
        weatherMap.set(today, data[0]);
        data.forEach(function(dataItem){
            var date = dataItem.dt_txt.substring(0, 10);
            if(date > today){
                weatherMap.set(date, dataItem);
            }
        });
        return weatherMap;
    }
}