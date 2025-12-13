<script lang="ts">
	import EquipmentView from '$lib/components/EquipmentView.svelte';
	let { togglePanelWithItem }: { togglePanelWithItem?: (itemId: string) => void } = $props();
</script>

<EquipmentView {togglePanelWithItem} />
