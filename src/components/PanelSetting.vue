<template functional>
  <div class="panel panel-default">
    <div
      class="panel-heading"
      data-toggle="collapse"
      data-parent="#accordion"
      :href="'#' + props.id"
    >
      <h4 class="panel-title">
        {{ props.title }}
      </h4>
    </div>
    <div
      :id="props.id"
      class="panel-collapse collapse"
      :class="{ in: props.open !== undefined }"
    >
      <div class="panel-body">
        <slot />
      </div>
    </div>
  </div>
</template>
