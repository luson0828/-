<template>
    <div>
        <div class="card">
            <el-card>
            <el-input style="width: 240px;" v-model="data.name" placeholder="请输入搜索内容" prefix-icon="Search" />    
            <el-button  @click="load" type="primary" style="margin-left: 5px;">查 询</el-button>
            <el-button @click="reset" type="warning" style="margin-left: 5px;">重 置</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-card>
                <el-button type="primary" style="margin-left: 5px;" @click="handleAdd">新 增</el-button>
                <el-button type="warning" style="margin-left: 5px;" @click="delBatch">批量删除</el-button>
            </el-card>
        </div>

        <div class="card">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="username" label="账号"/>
            <el-table-column prop="name" label="名称"/>
            <el-table-column label="操作">
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
            <el-dialog v-model="data.formVisible" title="信息管理员" width="500" destroy-on-close>
                <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="80px" style="padding-right: 40px; padding-top: 20px;">

                    <el-form-item label="账号" prop="username">
                        <el-input v-model="data.form.username" autocomplete="off" placeholder="请输入账号" />
                    </el-form-item>

                    <el-form-item label="名称" prop="name">
                        <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入名称" />
                    </el-form-item>

                </el-form>
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="data.formVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">保 存</el-button>
                </div>
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

const data = reactive({   
    tableData: [],
    name: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    formVisible: false,
    form: {},
    ids: {},
    rules: {
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        no: [
            { required: true, message: '请输入工号', trigger: 'blur' },
        ],

    }
})

const formRef = ref(null) //ref() 函数会返回一个包含 value 属性的对象，我们可以通过 formRef.value 来访问表单实例

const load = () => {
    request.get('/admin/selectPage', {
        params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize,
            name: data.name,
        }
    }).then(res => {
        data.tableData = res.data.list
        data.total = res.data.total
    })
}
load() // 立即初始化加载数据，确保用户进入页面时能看到数据

const reset = () => {
    data.name = null
    load()
}

const handleAdd = () => {
    data.formVisible = true;
    data.form = {}
}

const save = () =>{
    formRef.value.validate((valid) => { //调用表单实例的 validate 方法进行表单验证
        if (valid) {
            data.form.id ? update() : add()
        }
    })

}

const handleUpdate = (row) => {
    data.form = JSON.parse(JSON.stringify(row)) //深拷贝，取消后不会修改原对象
    data.formVisible = true
}

const add = () => {
        request.post('/admin/add' , data.form).then(res => { // res 是服务器（后端）返回的响应数据
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('新增操作成功啦')
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const update = () => {
        request.put('/admin/update' , data.form).then(res => {
        if(res.code === '200') {
            data.formVisible = false
            ElMessage.success('更新操作成功啦')
        }else{
            ElMessage.error(res.msg)
        }
    })
}

const del = (id) => {
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
          request.delete('/admin/deleteById/' + id).then(res => {
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
    data.ids = rows.map(row => row.id)
}

const delBatch = () => {
    if(data.ids.length === 0) {
        ElMessage.warning('请选择数据')
        return // 终止下面函数的执行
    }
    ElMessageBox.confirm('删除后无法恢复，确认删除吗？','确认删除', {type:'warning'}).then(() => {
        request.delete('/admin/deleteBatch', {data: data.ids}).then(res => {
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