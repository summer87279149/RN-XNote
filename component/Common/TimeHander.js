        var AllYearsData = []
         //获取本年度所有日期:["2017-01-01","2017-01-02","2017-01-03"....]
          export function getAllDataThisYear() {
              var y;
              let data = AllYearsData
              if (data.length > 0) {
                  return data
              } else {
                  function getDate(datestr) {
                      let temp = datestr.split("-");
                      let mydate = new Date(temp[0], temp[1], temp[2]);
                      return mydate;
                  }

                  let dateinstance = new Date()
                  let start = dateinstance.getFullYear() + "-" + "00-01"
                  let end = (dateinstance.getFullYear() + 1) + "-" + "00-01"
                  let startTime = getDate(start);
                  let endTime = getDate(end);
                  let results = []
                  while ((endTime.getTime() - startTime.getTime()) >= 0) {
                      let year = startTime.getFullYear();
                      let month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth();
                      let day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
                      let dataStr = year + "-" + (parseInt(month) + 1) + "-" + day
                      results.push(dataStr)
                      startTime.setDate(startTime.getDate() + 1);
                  }
                  AllYearsData = results
                  return results;
              }
          }
          export function getThisYear() {
              let dateinstance = new Date()
              return dateinstance.getFullYear()
          }
          export function FormatDate(strTime) {
              let date = new Date(strTime);
              return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
          }
          export function getCurrentYearMonth() {
              let myDate = new Date();
              myDate.getFullYear(); //获取完整的年份(4位,1970-????)
              myDate.getMonth(); //获取当前月份(0-11,0代表1月)
              return myDate.getFullYear() + "-" + (myDate.getMonth() + 1)
          }
          export function random() { //随机取整数
              return Math.floor(Math.random() * 10)
          }