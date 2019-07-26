<template functional>
  <div class="panel panel-default">
    <div
      class="panel-heading"
      data-toggle="collapse"
      data-parent="#accordion"
      :href="'#' + props.title"
    >
      <h4 class="panel-title">
        {{ props.title }}
      </h4>
    </div>
    <div
      :id="props.title"
      class="panel-collapse collapse"
      :class="{ in: props.open !== undefined }"
    >
      <div class="panel-body">
        <slot />
      </div>
    </div>
  </div>
</template>
