import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 12,
  },
  reportTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  reportSubtitle: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 2,
  },
  
  // Executive Summary Card
  summaryCard: {
    padding: 15,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreBadge: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginRight: 12,
  },
  gradeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  trafficImpactBox: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 8,
    borderRadius: 6,
    marginTop: 6,
  },
  trafficImpactText: {
    fontSize: 9,
    color: '#1e40af',
    lineHeight: 1.3,
  },

  // Priority Issues
  priorityIssuesBox: {
    marginTop: 8,
  },
  priorityIssuesTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#b91c1c',
    marginBottom: 4,
  },
  priorityIssueItem: {
    fontSize: 9,
    color: '#334155',
    marginBottom: 2,
  },

  // Section Dividers
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 15,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
    paddingLeft: 6,
  },

  // Score Breakdown Table
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
    backgroundColor: '#f1f5f9',
    padding: 5,
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 5,
    alignItems: 'center',
  },
  colName: {
    flex: 2,
    fontSize: 9,
    color: '#334155',
    fontWeight: 'bold',
  },
  colScore: {
    flex: 1,
    fontSize: 9,
    color: '#334155',
    textAlign: 'center',
  },
  colMax: {
    flex: 1,
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
  },
  colStatus: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },

  // Detailed Checks
  checkCardPass: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginBottom: 8,
  },
  checkCardWarning: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginBottom: 8,
  },
  checkCardFail: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderLeftWidth: 3,
    borderLeftColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginBottom: 8,
  },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  pointsLostBadge: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ef4444',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  checkDetailsGrid: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
  },
  detailCol: {
    flex: 1,
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 8,
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 9,
    color: '#475569',
  },
  fixLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#475569',
    marginTop: 2,
  },
  fixText: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.2,
  },
  codeBlock: {
    marginTop: 4,
    padding: 6,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    fontSize: 8,
    color: '#1e3a8a',
    fontFamily: 'Courier',
  },

  // Roadmap Section
  roadmapContainer: {
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  roadmapPhase: {
    marginBottom: 10,
  },
  roadmapPhaseTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  roadmapItem: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 2,
    paddingLeft: 6,
  },

  // Ideal State List
  idealItem: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 4,
  },
  idealTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  idealText: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.3,
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#94a3b8',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
  },
});

const PDFReport = ({ data }) => {
  const getCardStyle = (status) => {
    if (status === 'PASS') return styles.checkCardPass;
    if (status === 'WARNING') return styles.checkCardWarning;
    return styles.checkCardFail;
  };

  return (
    <Document>
      {/* PAGE 1: EXECUTIVE SUMMARY & SCORE BREAKDOWN */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.reportTitle}>SEO Audit scorecard</Text>
          <Text style={styles.reportSubtitle}>Audited Domain: {data.websiteURL}</Text>
          <Text style={styles.reportSubtitle}>Report Date: {new Date(data.createdAt || Date.now()).toLocaleDateString()}</Text>
        </View>

        {/* Executive Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Executive Audit Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.scoreBadge}>{data.seoScore}/100</Text>
            <View>
              <Text style={styles.gradeText}>Grade: {data.grade}</Text>
              <Text style={{ fontSize: 9, color: '#64748b' }}>Technical & Content SEO Health</Text>
            </View>
          </View>

          {data.trafficImpact && (
            <View style={styles.trafficImpactBox}>
              <Text style={styles.trafficImpactText}>{data.trafficImpact}</Text>
            </View>
          )}

          {data.topIssues && data.topIssues.length > 0 && (
            <View style={styles.priorityIssuesBox}>
              <Text style={styles.priorityIssuesTitle}>Top 3 Critical Issues to Fix Immediately:</Text>
              {data.topIssues.map((issue, idx) => (
                <Text key={idx} style={styles.priorityIssueItem}>
                  {idx + 1}. {issue}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Score Breakdown Table */}
        <Text style={styles.sectionHeader}>Score Breakdown by Category</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.colName}>Audit Section</Text>
          <Text style={styles.colScore}>Score</Text>
          <Text style={styles.colMax}>Max Points</Text>
          <Text style={styles.colStatus}>Status</Text>
        </View>
        {data.sections && data.sections.map((sec, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.colName}>{sec.name}</Text>
            <Text style={styles.colScore}>{sec.score}</Text>
            <Text style={styles.colMax}>{sec.maxPoints === 0 ? 'Bonus' : sec.maxPoints}</Text>
            <Text style={styles.colStatus}>{sec.status}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Generated by SEO Audit AI - Empowering digital presence with AI. Page 1
        </Text>
      </Page>

      {/* PAGE 2: ROADMAP & IDEAL STATE GUIDE */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.reportTitle}>SEO Optimization Roadmap</Text>
          <Text style={styles.reportSubtitle}>Audited Domain: {data.websiteURL}</Text>
        </View>

        {/* Priority Roadmap */}
        <Text style={styles.sectionHeader}>Priority Fix Timeline</Text>
        <View style={styles.roadmapContainer}>
          {data.roadmap?.week1 && data.roadmap.week1.length > 0 && (
            <View style={styles.roadmapPhase}>
              <Text style={[styles.roadmapPhaseTitle, { color: '#ef4444' }]}>Week 1 — Critical Fixes</Text>
              {data.roadmap.week1.map((item, idx) => (
                <Text key={idx} style={styles.roadmapItem}>• {item}</Text>
              ))}
            </View>
          )}

          {data.roadmap?.week2to4 && data.roadmap.week2to4.length > 0 && (
            <View style={styles.roadmapPhase}>
              <Text style={[styles.roadmapPhaseTitle, { color: '#f59e0b' }]}>Week 2-4 — High Priority</Text>
              {data.roadmap.week2to4.map((item, idx) => (
                <Text key={idx} style={styles.roadmapItem}>• {item}</Text>
              ))}
            </View>
          )}

          {data.roadmap?.month2 && data.roadmap.month2.length > 0 && (
            <View style={styles.roadmapPhase}>
              <Text style={styles.roadmapPhaseTitle}>Month 2 — Medium Priority</Text>
              {data.roadmap.month2.map((item, idx) => (
                <Text key={idx} style={styles.roadmapItem}>• {item}</Text>
              ))}
            </View>
          )}

          {data.roadmap?.ongoing && data.roadmap.ongoing.length > 0 && (
            <View style={styles.roadmapPhase}>
              <Text style={[styles.roadmapPhaseTitle, { color: '#10b981' }]}>Ongoing Maintenance</Text>
              {data.roadmap.ongoing.map((item, idx) => (
                <Text key={idx} style={styles.roadmapItem}>• {item}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Ideal State Guide */}
        <Text style={styles.sectionHeader}>Perfect 100/100 SEO Profile</Text>
        <View style={{ marginTop: 5 }}>
          {data.idealState && data.idealState.slice(0, 5).map((state, idx) => (
            <View key={idx} style={styles.idealItem}>
              <Text style={styles.idealTitle}>{state.section}</Text>
              <Text style={styles.idealText}>{state.description}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Generated by SEO Audit AI - Empowering digital presence with AI. Page 2
        </Text>
      </Page>

      {/* PAGE 3: DETAILED SECTION AUDIT CHECKLISTS (PART 1) */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.reportTitle}>Detailed Audit findings (Part 1)</Text>
          <Text style={styles.reportSubtitle}>Audited Domain: {data.websiteURL}</Text>
        </View>

        {data.sections && data.sections.slice(0, 3).map((sec, sIdx) => (
          <View key={sIdx} style={{ marginBottom: 15 }}>
            <Text style={styles.sectionHeader}>{sec.name} Score: {sec.score} / {sec.maxPoints === 0 ? 'Bonus' : sec.maxPoints}</Text>
            {sec.checks && sec.checks.map((chk, cIdx) => (
              <View key={cIdx} style={getCardStyle(chk.status)}>
                <View style={styles.checkRow}>
                  <Text style={styles.checkName}>[{chk.status}] {chk.name}</Text>
                  {chk.pointsLost > 0 && (
                    <Text style={styles.pointsLostBadge}>-{chk.pointsLost} pts</Text>
                  )}
                </View>
                
                <View style={styles.checkDetailsGrid}>
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Found:</Text>
                    <Text style={styles.detailValue}>{chk.currentValue || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Target:</Text>
                    <Text style={styles.detailValue}>{chk.targetValue || 'N/A'}</Text>
                  </View>
                </View>

                {chk.status !== 'PASS' && chk.fixRequired && chk.fixRequired !== 'None' && (
                  <View style={{ marginTop: 2 }}>
                    <Text style={styles.fixLabel}>Action Fix:</Text>
                    <Text style={styles.fixText}>{chk.fixRequired}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          Generated by SEO Audit AI - Empowering digital presence with AI. Page 3
        </Text>
      </Page>

      {/* PAGE 4: DETAILED SECTION AUDIT CHECKLISTS (PART 2) */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.reportTitle}>Detailed Audit findings (Part 2)</Text>
          <Text style={styles.reportSubtitle}>Audited Domain: {data.websiteURL}</Text>
        </View>

        {data.sections && data.sections.slice(3).map((sec, sIdx) => (
          <View key={sIdx} style={{ marginBottom: 15 }}>
            <Text style={styles.sectionHeader}>{sec.name} Score: {sec.score} / {sec.maxPoints === 0 ? 'Bonus' : sec.maxPoints}</Text>
            {sec.checks && sec.checks.slice(0, 5).map((chk, cIdx) => (
              <View key={cIdx} style={getCardStyle(chk.status)}>
                <View style={styles.checkRow}>
                  <Text style={styles.checkName}>[{chk.status}] {chk.name}</Text>
                  {chk.pointsLost > 0 && (
                    <Text style={styles.pointsLostBadge}>-{chk.pointsLost} pts</Text>
                  )}
                </View>
                
                <View style={styles.checkDetailsGrid}>
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Found:</Text>
                    <Text style={styles.detailValue}>{chk.currentValue || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Target:</Text>
                    <Text style={styles.detailValue}>{chk.targetValue || 'N/A'}</Text>
                  </View>
                </View>

                {chk.status !== 'PASS' && chk.fixRequired && chk.fixRequired !== 'None' && (
                  <View style={{ marginTop: 2 }}>
                    <Text style={styles.fixLabel}>Action Fix:</Text>
                    <Text style={styles.fixText}>{chk.fixRequired}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          Generated by SEO Audit AI - Empowering digital presence with AI. Page 4
        </Text>
      </Page>
    </Document>
  );
};

export default PDFReport;
