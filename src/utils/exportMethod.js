// 导出Excel公用方法
import axios from 'axios'
export function exportMethod(data) {
  axios({
      method: data.method,
      url: `${data.url}${data.params ? '?' + data.params : ''}`,
      responseType: 'blob',
	  headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") }
  }).then((res) => {
      const link = document.createElement('a')
      let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.download = data.fileName //下载的文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
  }).catch(error => {
      this.$message.error('网络错误')
      console.log(error)
  })
}
