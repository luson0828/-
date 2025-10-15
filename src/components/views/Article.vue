<template>
    <div>
        <div class="card">
            <el-card>
            <el-input style="width: 240px;" v-model="data.title" placeholder="请输入搜索标题" prefix-icon="Search" />    
            <el-button @click="load" type="primary" style="margin-left: 5px;">查 询</el-button>
            <el-button @click="reset" type="warning" style="margin-left: 5px;">重 置</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-card>
                <el-button type="primary" style="margin-left: 5px;" @click="handleAdd">新 增</el-button>
                <el-button type="warning" style="margin-left: 5px;" @click="delBatch">批量删除</el-button>
                <el-upload
                        style="display: inline-block; margin: 0 5px;"
                        action="http://localhost:8080/article/import"
                        :show-file-list="false"
                        :on-success="importSuccess"
                    >
                    <el-button type="success" style="margin-left: 5px;">导 入</el-button>
                </el-upload>

                <el-button @click="exportData" type="info" style="margin-left: 5px;">导 出</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="title" label="标题"/>
            <el-table-column prop="img" label="封面">
                <template #default="scope">
                    <el-image v-if="scope.row.img" :src="scope.row.img" :preview-src-list=[scope.row.img] preview-teleported style="width: 100px; height: 60px;"/>
                </template>
            </el-table-column>
            <el-table-column label="简介" prop="description" show-overflow-tooltip />
            <el-table-column label="内容" width="120">
                <template #default="scope">
                    <el-button type="primary" @click="view(scope.row.content)">查看内容</el-button>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="time" />
            <el-table-column label="操作" width="120">
                <template #default="scope">
                    <el-button @click="handleUpdate(scope.row)" type="primary" :icon="Edit" circle></el-button>
                    <el-button @click="del(scope.row.id)" type="danger"  :icon="Delete" circle></el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>

        <div class="card">
            <el-pagination
            @size-change="load"
            @current-change="load"
            v-model:current-page="data.pageNum"
            v-model:page-size="data.pageSize"
            :page-sizes="[5, 10, 15, 20,]"
            :size="size"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.total"
            />
        </div>

        <div>
            <el-dialog v-model="data.formVisible" title="文章信息" width="50%" destroy-on-close>
                <el-form ref="formRef" :model="data.form" label-width="80px" style="padding-right: 40px; padding-top: 20px;">

                    <el-form-item label="标题" prop="title">
                        <el-input v-model="data.form.title" autocomplete="off" placeholder="请输入标题" />
                    </el-form-item>

                    <el-form-item label="封面">
                        <el-upload
                            action="http://localhost:8080/files/upload"
                            list-type="picture"
                            :on-success="handleImgSuccess" 
                        > 
                            <el-button type="primary">上传封面</el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="简介" prop="description">
                        <el-input type="textarea" :rows="3" v-model="data.form.description" autocomplete="off" placeholder="请输入简介" />
                    </el-form-item>

                    <el-form-item label="内容" prop="description">
                        <div style="border: 1px solid #ccc">
                            <Toolbar
                                style="border-bottom: 1px solid #ccc"
                                :editor="editorRef"
                                :defaultConfig="toolbarConfig"
                                :mode="mode"
                            />
                            <Editor
                                style="height: 500px; overflow-y: hidden;"
                                v-model="valueHtml"
                                :defaultConfig="editorConfig"
                                :mode="mode"
                                @onCreated="handleCreated"
                            />
                        </div>
                    </el-form-item>

                </el-form>
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="data.formVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">保 存</el-button>
                </div>
                </template>
            </el-dialog>

            <el-dialog title="内容" v-model="data.viewVisible" width="50%" :close-on-click-modal="false" destroy-on-close>
                <div class="editor-content-view" style="padding: 20px" v-html="data.content"></div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="data.viewVisible = false">关 闭</el-button>
                    </span>
                </template>
            </el-dialog>

        </div>
    </div>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Star,
  Search,
} from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import request from '@/utils/request.js'
import "../../main.js";
import { ElMessage, ElMessageBox } from 'element-plus';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const data = reactive({   
    tableData: [],
    title: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    formVisible: false,
    form: {},
    ids: {},
    content: null,
    
})

const exportData = () => {
    //导出数据是通过流的形式下载excel，打开流的链接，浏览器会自动下载文件
    window.open('http://localhost:8080/article/export')
}

const importSuccess = () => {
    ElMessage.success('批量导入数据成功')
    load()
}

/* wangEditor初始化开始 */
const toolbarConfig = {} // 使用默认工具栏配置
const editorConfig = {  // 编辑器配置
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            server: 'http://localhost:8080/files/wang/upload', // 服务端图片上传接口
            fieldName: 'file' // 服务端图片上传接口参数
        }
    }
}
const valueHtml = ref('') // 编辑器内容
const editorRef = shallowRef() // 响应式引用，把editorRef理解为空盒子，shallowRef性能更好
const mode = 'default' // 编辑器模式，默认模式
    // 组件销毁时，也及时销毁编辑器
      onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
      })

      const handleCreated = (editor) => {
        editorRef.value = editor // 把editor实例赋值给editorRef，后续可以通过editorRef.value调用editor实例的方法
      }
/* wangEditor初始化结束 */

const view = (content) => {
    data.content = content
    data.viewVisible = true
}

const load = () => {
    request.get('/article/selectPage', {
        params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            title: data.title
        }
    }).then(res => {
            data.tableData = res.data.list
            data.total = res.data.total
    })
}
load()

const handleImgSuccess = (res) => {
    data.form.img = res.data // 上传成功后，将图片路径赋值给表单的 img 字段
}

const reset = () => {
    data.title = null
    load()
}

const handleAdd = () => {
    console.log('点击了新增按钮');
    data.formVisible = true;
    console.log('当前 formVisible 值：', data.formVisible);
    data.form = {} // 清空表单数据
    valueHtml.value = ''
}

const save = () =>{
    data.form.content = valueHtml.value
    data.form.id ? update() : add()
}

const handleUpdate = (row) => {
    data.form = JSON.parse(JSON.stringify(row)) //深拷贝，取消后不会修改原对象
    valueHtml.value = data.form.content || ''
    data.formVisible = true
}

const add = () => {
        request.post('/article/add' , data.form).then(res => {
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('新增操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const update = () => {
        request.put('/article/update' , data.form).then(res => {
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('更新操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const del = (id) => {
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
          request.delete('/article/deleteById/' + id).then(res => {
        if(res.code === '200') {
            ElMessage.success('删除操作成功啦')
            load()
        }else{
            ElMessage.error(res.msg)
        }
    })  
    }).catch(() => {
        // 用户点击了取消按钮，可添加提示信息
        ElMessage.info('已取消删除操作')
    })

}

const handleSelectionChange = (rows) => {
    console.log(rows)
    data.ids = rows.map(row => row.id)
    console.log(data.ids)

}

const delBatch = () => {
    if(data.ids.length === 0) {
        ElMessage.warning('请选择数据')
        return //终止下面函数的执行
    }
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
        request.delete('/article/deleteBatch', {data: data.ids}).then(res => {
            if(res.code === '200') {
                ElMessage.success('删除操作成功啦')
                load()
        }else{
            ElMessage.error(res.msg)
        }
    })  
    }).catch(() => {
        // 用户点击了取消按钮，可添加提示信息
        ElMessage.info('已取消删除操作')
    })
}



</script>

<style scoped>



</style>