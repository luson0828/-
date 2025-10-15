<template>
  <div class="home-container">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <el-card class="welcome-card" shadow="never">
        <div class="welcome-content">
          <div class="welcome-icon">
            <el-icon><Reading /></el-icon>
          </div>
          <div class="welcome-text">
            <h1>编务通管理平台欢迎您</h1>
            <p class="welcome-subtitle">高效管理员工信息，便捷处理人事事务</p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 系统规则说明 -->
    <div class="rules-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="rule-card" shadow="hover">
            <template #header>
              <div class="rule-header">
                <el-icon><Document /></el-icon>
                <span>系统功能说明</span>
              </div>
            </template>
            <div class="rule-content">
              <ul class="rule-list">
                <li>👥 员工信息管理：新增、编辑、删除员工档案</li>
                <li>🏢 部门组织管理：设置和管理部门结构</li>
                <li>📋 人事事务处理：处理入职、离职、调岗等事务</li>
                <li>📊 人员分配数据图：对员工部门分配一目了然</li>
                <li>💰 文章发布记录：查看最近文章发布数量</li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="rule-card" shadow="hover">
            <template #header>
              <div class="rule-header">
                <el-icon><InfoFilled /></el-icon>
                <span>使用须知</span>
              </div>
            </template>
            <div class="rule-content">
              <ul class="rule-list">
                <li>✅ 请定期备份人事数据</li>
                <li>✅ 操作前请确认员工信息准确性</li>
                <li>✅ 严格遵守数据隐私保护规定</li>
                <li>✅ 重要操作需要双重确认</li>
                <li>✅ 系统支持Excel导入导出功能</li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access">
      <el-card shadow="hover">
        <template #header>
          <div class="access-header">
            <el-icon><Connection /></el-icon>
            <span>快捷入口</span>
          </div>
        </template>
        <div class="access-buttons">
          <el-button type="primary" icon="Plus" size="large" @click="handleAdd">
            新增员工
          </el-button>
          <el-button type="success" icon="User" size="large" @click="handleEmployeeList">
            员工列表
          </el-button>
          <el-button type="warning" icon="OfficeBuilding" size="large" @click="handleDepartment">
            部门管理
          </el-button>
          <el-button type="info" icon="Search" size="large" @click="handleSearch">
            员工查询
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Reading,
  Document,
  InfoFilled,
  Connection,
  Plus,
  User,
  Search,
  OfficeBuilding
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'



const router = useRouter()

const handleAdd = () => {
  // 跳转到员工管理页面并自动触发新增
  router.push('/manager/employee?action=add')
}

const handleEmployeeList = () => {
  // 跳转到员工列表页面
  router.push('/manager/employee')
}

const handleDepartment = () => {
  // 跳转到部门管理页面
  router.push('/manager/department')
}

const handleSearch = () => {
  // 跳转到员工信息页面
  router.push('/manager/employee')
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.welcome-section {
  margin-bottom: 30px;
}

.welcome-card {
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.welcome-content {
  display: flex;
  align-items: center;
  padding: 40px 30px;
}

.welcome-icon {
  margin-right: 20px;
}

.welcome-icon .el-icon {
  font-size: 60px;
  color: #409eff;
}

.welcome-text h1 {
  font-size: 32px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 10px 0;
}

.welcome-subtitle {
  font-size: 18px;
  color: #606266;
  margin: 0;
}

.rules-section {
  margin-bottom: 30px;
}

.rule-card {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.rule-header {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.rule-header .el-icon {
  margin-right: 10px;
  color: #409eff;
  font-size: 20px;
}

.rule-content {
  padding: 10px 0;
}

.rule-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rule-list li {
  padding: 12px 0;
  font-size: 14px;
  color: #606266;
  border-bottom: 1px solid #ebeef5;
}

.rule-list li:last-child {
  border-bottom: none;
}

.quick-access {
  margin-bottom: 20px;
}

.access-header {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.access-header .el-icon {
  margin-right: 10px;
  color: #409eff;
  font-size: 20px;
}

.access-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
}

.access-buttons .el-button {
  min-width: 120px;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
}
</style>