/* standard.js */
 DomReady.ready(function() {
{%
Dim i =1
Dim strOtherRID = CurrentADC.PropValue("otherRID")
Dim strOtherQID = CurrentADC.PropValue("otherQID")
if strOtherRID = "" Then
    Dim ar = CurrentQuestion.AvailableResponses
    strOtherQID = ""
    Dim nSemiopen
    For nSemiopen =1 to 5
        Dim respSemiOpen =  CurrentADC.PropValue("otherResponse" + nSemiOpen)
        Dim qesSemiOpen =  CurrentADC.PropQuestion("otherQuestion" + nSemiOpen)
        If respSemiOpen <> "" And  qesSemiOpen.ID <> DK And  qesSemiOpen.type="open" Then
            For i = 1 to ar.Count
                If ar[i].EntryCodeStr = respSemiOpen.ToString() Then
                    If strOtherRID <> "" Then
                    	strOtherRID = strOtherRID + ","
                        strOtherQID = strOtherQID + ","
                    Endif
                    strOtherRID = strOtherRID + ar[i].Index
                    strOtherQID = strOtherQID + qesSemiOpen.InputName()
                Endif
            Next i
        EndIf
    Next nSemiopen
Endif
%}

    var statementsOther = new StatementsOther({
        instanceId : '{%= CurrentADC.InstanceId%}',
        currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
		width : 400,
		imageAlign : '{%= CurrentADC.PropValue("imageAlign") %}',
		imageWidth : 100,
		imageHeight : 100,
		isMultiple: {%= (CurrentQuestion.Type = "multiple") %},
		controlWidth : '{%= CurrentADC.PropValue("controlWidth") %}',
		columns: {%= CurrentADC.PropValue("columns") %},
		maxWidth : '{%= CurrentADC.PropValue("maxWidth") %}',
		maxImageWidth : '{%= CurrentADC.PropValue("maxImageWidth") %}',
		maxImageHeight : '{%= CurrentADC.PropValue("maxImageHeight") %}',
		forceImageSize : '{%= CurrentADC.PropValue("forceImageSize") %}',
        animateResponses: {%= (CurrentADC.PropValue("animateResponses") = "1") %},
		autoForward: {%= (CurrentADC.PropValue("autoForward") = "1") %},
		numberNS: {%= CurrentADC.PropValue("numberNS") %},
		useRange: {%= (CurrentADC.PropValue("useRange") = "1") %},
		responseTextPadding : '{%= CurrentADC.PropValue("responseTextPadding") %}',
		responseTextLineHeight : '{%= CurrentADC.PropValue("responseTextLineHeight") %}',
		showResponseHoverColour: {%= (CurrentADC.PropValue("showResponseHoverColour") = "1") %},
		showResponseHoverFontColour: {%= (CurrentADC.PropValue("showResponseHoverFontColour") = "1") %},
		showResponseHoverBorder: {%= (CurrentADC.PropValue("showResponseHoverBorder") = "1") %},
		controlAlign : '{%= CurrentADC.PropValue("controlAlign") %}',
        otherRID : '{%= strOtherRID %}',
		otherQID : '{%= strOtherQID %}',
    deselectionEnabled : {%= (CurrentADC.PropValue("deselectionEnabled") = "1") %},    
		rangeGradientDirection : '{%= CurrentADC.PropValue("rangeGradientDirection") %}',
        mergeColumnWidth : '{%= CurrentADC.PropValue("mergeColumnWidth") %}',
        responseHeight : '{%= CurrentADC.PropValue("responseHeight") %}',
		{% IF CurrentADC.PropValue("useRange") = "1" Then %}
			range: '{%= CurrentADC.PropValue("responseColourPrimary") %};{%= CurrentADC.PropValue("responseColourPrimary") %};{%= CurrentADC.PropValue("responseColourRangePrimary") %};{%= CurrentADC.PropValue("responseColourRangePrimary") %}',
		{% EndIF %}
		items : [
			{% IF CurrentQuestion.Type = "single" Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_single.js").ToText()%}
			{% ElseIf CurrentQuestion.Type = "multiple" Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_multiple.js").ToText()%}
			{% EndIF %}
		]
    });
});
