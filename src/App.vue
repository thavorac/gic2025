<script setup lang="ts"></script>

<template>
  <div id="app">
    <div class="container">
      <table>
        <tr>
          <td colspan="5">
            <div id="screen">
              <span id="screen_top">M=0</span>
              <div id="screen_bottom">
                <!-- v-text is a directive that is used to replace the content of HTML tag with private data -->
                <!-- It will update the content automatically when data is changed. It is called data reactive -->
                <span id="operand1">0</span>
                <span id="operator"></span>
                <span id="operand2"></span>
              </div>
              <!-- <span id="screen_bottom">0</span> -->
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" class="btn btn-warning">MC</button>
          </td>
          <td>
            <button type="button" class="btn btn-warning">MR</button>
          </td>
          <td>
            <button type="button" class="btn btn-warning">M-</button>
          </td>
          <td>
            <button type="button" class="btn btn-warning">M+</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" class="btn btn-light">7</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">8</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">9</button>
          </td>
          <td>
            <button type="button" class="btn btn-secondary">÷</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">+/-</button>
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" class="btn btn-light">4</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">5</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">6</button>
          </td>
          <td>
            <button type="button" class="btn btn-secondary">x</button>
          </td>
          <td>
            <button type="button" class="btn btn-secondary">-</button>
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" class="btn btn-light">1</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">2</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">3</button>
          </td>
          <td rowspan="2">
            <button type="button" class="btn btn-secondary long-btn">+</button>
          </td>
          <td rowspan="2">
            <button type="button" class="btn btn-primary long-btn">=</button>
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" class="btn btn-danger">C</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">0</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">.</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="alert alert-danger" id="message_panel" role="alert">something wrong here</div>
  </div>
</template>

<style scoped></style>
